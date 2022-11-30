import { Component, Input, Injector, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarMonthViewDay } from 'angular-calendar';
import { BaseModal } from 'carbon-components-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../core/services/employee.service';
import * as moment from 'moment';
import { ManagerService } from '../../core/services/manager.service';

@Component({
	selector: 'app-shift-change',
	templateUrl: './shift-change.component.html',
	styleUrls: ['./shift-change.component.scss']
})
export class ShiftChangeComponent extends BaseModal implements OnInit {
	view: CalendarView = CalendarView.Month;
	viewDate: Date = new Date();

	events: any;
	switchID;
	switchName;
	exchangerEvent;
	exchangerID;
	exchangerName;
	exchangerDate;

	currentEvent;
	currentDate;

	chosenEvent;

	submitForm: FormGroup;
	remarks: any;

	constructor(
		protected injector: Injector,
		private router: Router,
		private fb: FormBuilder,
		public toastr: ToastrService,
		public managerService: ManagerService,
		public employeeService: EmployeeService) {
		super();
		this.events = this.injector.get('events');
		this.switchID = this.injector.get('id');
		this.switchName = this.injector.get('name');
		this.exchangerEvent = this.injector.get('exchangerEvent');
		this.exchangerDate = moment(this.exchangerEvent.start).format('dddd, Do MMMM YYYY');
		this.exchangerID = this.injector.get('exchangerID');
		this.exchangerName = this.injector.get('exchangerName');
	}

	navigate() { this.router.navigate(['/dashboard']); }

	ngOnInit() {
		console.log(this.events);
		console.log(this.exchangerEvent);

		this.submitForm = this.fb.group({
			pickupDate: [new Date(), Validators.required],
			remarks: ['', Validators.required],
			});
	}
	showSuccess() {
		this.toastr.success('Hello world!', 'Toastr fun!');
	}

	showError(errorMessage) {
		if (
			errorMessage === '' ||
			errorMessage === null ||
			errorMessage === undefined
		) {
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
		body.forEach((day) => {
			day.badgeTotal = day.events.filter(
				(event) => event.meta.incrementsBadgeTotal
			).length;


			day.events.sort(function(a, b) {
				var nameA = a.title.toUpperCase(); // ignore upper and lowercase
				var nameB = b.title.toUpperCase(); // ignore upper and lowercase
				if (nameA < nameB) {
				  return -1;
				}
				if (nameA > nameB) {
				  return 1;
				}
			  
				// names must be equal
				return 0;
			});
		});
	}

	exchange(event) {
		if (event.start < new(Date)) {
			this.showError('Cannot switch past shift, please choose a future shift');
			return;
		}

		this.chosenEvent = event;
	}

	onClick(event) {
		console.log(event);

		if (event && event.length !== 0) {
			this.currentEvent = event;
			this.currentDate = moment(event[0].start).format('dddd, Do MMMM YYYY');
		}
	}

	submitRequest() {
		if (this.remarks === '' || this.remarks === null || this.remarks === undefined) {
			this.toastr.error('Remark is mandatory', 'Invalid Remarks');
			return;
		}

		if(this.chosenEvent === undefined || this.chosenEvent === null) {
			this.showError('Please check if you have choose a shift on the substitute day, if not then click the exchange button above to choose a shift');
		}

		if (this.chosenEvent.title === 'OFF') {
			this.showError('Cannot switch to substitute day off, please ask the person to submit shift switch request to switch his/her day off to your shift');
			return;
		}

		if (this.chosenEvent.start < new(Date)) {
			this.showError('Cannot switch to past shift, please choose a future shift');
			return;
		}

		const content = {
			'originShiftID': this.exchangerEvent.meta.shiftID,
			'targetShiftID': this.chosenEvent.meta.shiftID,
			'remark': this.remarks
		};

		this.employeeService.submitShiftSwitchRequest(content)
		.subscribe(
			response => {
				console.log(response);
				this.toastr.success('Succesfully ask for shift switch');
				this.closeModal();
				// location.reload()
				// this.navigate();
		},
		error => {
			this.showError(error.error)
			console.log(error);
		});
	}

	assignShift() {
		if (this.remarks === '' || this.remarks === null || this.remarks === undefined) {
			this.toastr.error('Remark is mandatory', 'Invalid Remarks');
			return;
		}

		const content = {
			'originShiftID': this.exchangerEvent.meta.shiftID,
			'substituteID': this.switchID,
			'remark': this.remarks
		};

		this.managerService.assignShift(content)
		.subscribe(
			response => {
				console.log(response);
				this.toastr.success('Succesfully assigned shift to ' + this.switchName);
				this.closeModal();
				// location.reload();
				// this.navigate();
		},
		error => {
			console.log(error);
			this.toastr.error(error.error);
		});
	}
}
