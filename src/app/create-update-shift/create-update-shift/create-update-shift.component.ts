import { Component, Input, Injector, OnInit } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../core/services/employee.service';
import { ManagerService } from '../../core/services/manager.service';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';

import { Subject } from 'rxjs';

@Component({
	selector: 'app-create-update-shift',
	templateUrl: './create-update-shift.component.html',
	styleUrls: ['./create-update-shift.component.scss']
})
export class CreateUpdateShiftComponent extends BaseModal implements OnInit {
	public shifts: any = [];
	shiftValue: any = '';

	public startHour: string = undefined;
	invalidStartHour = false;

	public startMinute: string = undefined;
	invalidStartMinute = false;

	public startTime: any;
	invalidStartTime = false;

	public endHour: string = undefined;
	invalidEndHour = false;

	public endMinute: string = undefined;
	invalidEndMinute = false;

	public endTime: any;
	invalidEndTime = false;

	public hour: any = [
		{
			content: '00'
		},
		{
			content: '01'
		},
		{
			content: '02'
		},
		{
			content: '03'
		},
		{
			content: '04'
		},
		{
			content: '05'
		},
		{
			content: '06'
		},
		{
			content: '07'
		},
		{
			content: '08'
		},
		{
			content: '09'
		},
		{
			content: '10'
		},
		{
			content: '11'
		},
		{
			content: '12'
		},
		{
			content: '13'
		},
		{
			content: '14'
		},
		{
			content: '15'
		},
		{
			content: '16'
		},
		{
			content: '17'
		},
		{
			content: '18'
		},
		{
			content: '19'
		},
		{
			content: '20'
		},
		{
			content: '21'
		},
		{
			content: '22'
		},
		{
			content: '23'
		},
	];

	public minute: any = [
		{
			content: '00'
		},
		{
			content: '01'
		},
		{
			content: '02'
		},
		{
			content: '03'
		},
		{
			content: '04'
		},
		{
			content: '05'
		},
		{
			content: '06'
		},
		{
			content: '07'
		},
		{
			content: '08'
		},
		{
			content: '09'
		},
		{
			content: '10'
		},
		{
			content: '11'
		},
		{
			content: '12'
		},
		{
			content: '13'
		},
		{
			content: '14'
		},
		{
			content: '15'
		},
		{
			content: '16'
		},
		{
			content: '17'
		},
		{
			content: '18'
		},
		{
			content: '19'
		},
		{
			content: '20'
		},
		{
			content: '21'
		},
		{
			content: '22'
		},
		{
			content: '23'
		},
		{
			content: '24'
		},
		{
			content: '25'
		},
		{
			content: '26'
		},
		{
			content: '27'
		},
		{
			content: '28'
		},
		{
			content: '29'
		},
		{
			content: '30'
		},
		{
			content: '31'
		},
		{
			content: '32'
		},
		{
			content: '33'
		},
		{
			content: '34'
		},
		{
			content: '35'
		},
		{
			content: '36'
		},
		{
			content: '37'
		},
		{
			content: '38'
		},
		{
			content: '39'
		},
		{
			content: '40'
		},
		{
			content: '41'
		},
		{
			content: '42'
		},
		{
			content: '43'
		},
		{
			content: '44'
		},
		{
			content: '45'
		},
		{
			content: '46'
		},
		{
			content: '47'
		},
		{
			content: '48'
		},
		{
			content: '49'
		},
		{
			content: '50'
		},
		{
			content: '51'
		},
		{
			content: '52'
		},
		{
			content: '53'
		},
		{
			content: '54'
		},
		{
			content: '55'
		},
		{
			content: '56'
		},
		{
			content: '57'
		},
		{
			content: '58'
		},
		{
			content: '59'
		},
	];

	workCategory: any;

	public category: any = [
		{
			content: 'Work'
		},
		{
			content: 'Off'
		}
	];

	eventID: any;
	shiftName: any;

	shiftStart;
	shiftEnd;
	events;
	refresh;
	badge;
	name;
	currentDate;
	showDate;
	event;
	shiftID;
	newID;

	constructor(
		protected injector: Injector,
		private router: Router,
		private fb: FormBuilder,
		public toastr: ToastrService,
		public managerService: ManagerService,
		public employeeService: EmployeeService) {
		super();

		this.badge = this.injector.get('badge');
		this.name = this.injector.get('name');
		this.events = this.injector.get('events');
		this.refresh = this.injector.get('refresh');
		this.currentDate = this.injector.get('currentDate');
		this.event = this.injector.get('event');
	}

	navigate() { this.router.navigate(['/dashboard']); }

	ngOnInit() {
		if (this.event !== '-') {
			this.getShiftDetail();
		}

		console.log('Current event: ', this.event);
		this.searchShiftName('');
		this.showDate = moment(this.currentDate).format('dddd, Do MMMM YYYY');
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


	searchShiftName(filter?) {
		const content = {
			'_id': filter
		};
		this.managerService.getAllShiftName(content).pipe(debounceTime(0))
			.subscribe(
				response => {
					this.shifts = [];

					response.forEach(element => {
						const newShift = {
							'content': element._id
						};

						this.shifts.push(newShift);
					});


					console.log(this.shifts);

				},
				error => {
					console.log(error);
				});
	}

	onSelectedHourStart(event) {
		if (event.length === 0) {
			this.invalidStartHour = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidStartHour = false;
		console.log('Selected: ', selected);
		this.startHour = selected;
	}

	onSelectedMinuteStart(event) {
		if (event.length === 0) {
			this.invalidStartMinute = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidStartMinute = false;
		console.log('Selected: ', selected);
		this.startMinute = selected;
	}

	onStartTimeInput(event) {
		if (event.srcElement.value === '') {
			this.invalidStartTime = true;
		} else {
			this.invalidStartTime = false;
		}
	}

	onSelectedHourEnd(event) {
		if (event.length === 0) {
			this.invalidEndHour = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidEndHour = false;
		console.log('Selected: ', selected);
		this.endHour = selected;
	}

	onSelectedMinuteEnd(event) {
		if (event.length === 0) {
			this.invalidEndMinute = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidEndMinute = false;
		console.log('Selected: ', selected);
		this.endMinute = selected;
	}

	onEndTimeInput(event) {
		if (event.srcElement.value === '') {
			this.invalidEndTime = true;
		} else {
			this.invalidEndTime = false;
		}
	}

	createShift() {
		const nowDate = new Date(this.currentDate);

		nowDate.setHours(0, 0, 0, 0);

		if (this.shiftName === undefined) {
			this.toastr.error('Please enter the correct shift name', 'Invalid Shift Name');
			return;
		} else if (this.startHour === undefined || this.startMinute === undefined) {
			this.toastr.error('Please enter the correct start time', 'Invalid Time');
			return;
		} else if (this.endHour === undefined || this.endMinute === undefined) {
			this.toastr.error('Please enter the correct end time', 'Invalid Time');
			return;
		} else if (this.workCategory === undefined) {
			this.toastr.error('Please enter the work/off', 'Invalid Shift Category');
			return;
		}

		console.log('Hello: ', this.badge);
		console.log('Hello: ', this.name);
		console.log('Hello: ', this.refresh);
		console.log('Hello: ', this.shiftName.content);
		console.log('Hello: ', this.currentDate);
		console.log('Hello: ', nowDate);
		console.log('Hello: ', this.workCategory.content);

		this.startTime = new Date(nowDate);

		// tslint:disable-next-line: radix
		this.startTime.setHours(parseInt(this.startHour), parseInt(this.startMinute), 0, 0);
		console.log(this.startTime);

		if (this.endHour < this.startHour) {
			this.endTime = new Date(nowDate);
			this.endTime.setDate(nowDate.getDate() + 1);
		} else if ((this.endHour === this.startHour) && this.endMinute < this.startMinute) {
			this.endTime = new Date(nowDate);
			this.endTime.setDate(nowDate.getDate() + 1);
		} else {
			this.endTime = new Date(nowDate);
		}

		// tslint:disable-next-line: radix
	this.endTime.setHours(parseInt(this.endHour), parseInt(this.endMinute), 0, 0);
	console.log(this.endTime);

		const content = {
			'badge': this.badge,
			'nama': this.name,
			'namashift': this.shiftName.content,
			'detail': String(this.workCategory.content).toLowerCase(),
			'shiftStart': this.startTime,
			'shiftEnd': this.endTime
		};

		console.log('Content: ', content);

		this.managerService.createShift(content)
		.subscribe(
			response => {
				console.log(response);

				this.newID = JSON.stringify(response.InsertedID);
				this.newID = this.newID.replaceAll('"', '');
				// this.newID = Object.values(response)[0];
				console.log(this.newID);

				if (String(this.workCategory.content).toLowerCase() === 'off') {
				} else if (this.shiftName.content.includes('STANDBY 1')) {
					this.shiftName.content = '$1';
				} else if (this.shiftName.content.includes('STANDBY 2')) {
					this.shiftName.content = '$2';
				} else if (this.shiftName.content.includes('STANDBY 3')) {
					this.shiftName.content = '$3';
				} else if (this.shiftName.content.includes('STANDBY ALL')) {
					this.shiftName.content = '$ALL';
				} else if (this.shiftName.content.includes('STANDBY SOD')) {
					this.shiftName.content = '$SOD';
				} else if (this.shiftName.content.includes('STANDBY DOUBLE SHIFT')) {
					this.shiftName.content = '$2S';
				} else if (this.shiftName.content.includes('STANDBY SME')) {
					this.shiftName.content = '$SME';
				} else if (this.shiftName.content.includes('STAGGERED 1')) {
					this.shiftName.content = 'STAG 1';
				} else if (this.shiftName.content.includes('STAGGERED 2')) {
					this.shiftName.content = 'STAG 2';
				} else if (this.shiftName.content.includes('STAGGERED 3')) {
					this.shiftName.content = 'STAG 3';
				} else if (this.shiftName.content.includes('STAGGERED')) {
					this.shiftName.content = 'STAG';
				} else if (this.shiftName.content.includes('STG 1')) {
					this.shiftName.content = 'STAG 1';
				} else if (this.shiftName.content.includes('STG 2')) {
					this.shiftName.content = 'STAG 2';
				} else if (this.shiftName.content.includes('STG 3')) {
					this.shiftName.content = 'STAG 3';
				} else if (this.shiftName.content.includes('OFFICE')) {
					this.shiftName.content = 'S1';
				} else if (this.shiftName.content.includes('1A')) {
					this.shiftName.content = 'S1A';
				} else if (this.shiftName.content.includes('1B')) {
					this.shiftName.content = 'S1B';
				} else if (this.shiftName.content.includes('1')) {
					this.shiftName.content = 'S1';
				} else if (this.shiftName.content.includes('2A')) {
					this.shiftName.content = 'S2A';
				} else if (this.shiftName.content.includes('2B')) {
					this.shiftName.content = 'S2B';
				} else if (this.shiftName.content.includes('2')) {
					this.shiftName.content = 'S2';
				} else if (this.shiftName.content.includes('3A')) {
					this.shiftName.content = 'S3A';
				} else if (this.shiftName.content.includes('3B')) {
					this.shiftName.content = 'S3B';
				} else if (this.shiftName.content.includes('3')) {
					this.shiftName.content = 'S3';
				}

				this.toastr.success('Succesfully created a new shift for ' + this.name);

				this.closeModal();
				this.events.push(
					{
						title: this.shiftName.content,
						start: this.startTime,
						meta: {
							incrementsBadgeTotal: false,
							shiftID: this.newID,
							shiftStart: this.startTime
						},
					}
				);

				this.refresh.next();

				// location.reload();
				// this.navigate();
		},
		error => {
			console.log(error);
		});
	}

	editShift() {
		const nowDate = new Date(this.currentDate);

		nowDate.setHours(0, 0, 0, 0);

		if (this.shiftName === undefined) {
			this.toastr.error('Please enter the correct shift name', 'Invalid Shift Name');
			return;
		} else if (this.startHour === undefined || this.startMinute === undefined) {
			this.toastr.error('Please enter the correct start time', 'Invalid Time');
			return;
		} else if (this.endHour === undefined || this.endMinute === undefined) {
			this.toastr.error('Please enter the correct end time', 'Invalid Time');
			return;
		} else if (this.workCategory === undefined) {
			this.toastr.error('Please enter the work/off', 'Invalid Shift Category');
			return;
		}

		console.log('Hello: ', this.badge);
		console.log('Hello: ', this.name);
		console.log('Hello: ', this.refresh);
		console.log('Hello: ', this.shiftName.content);
		console.log('Hello: ', this.currentDate);
		console.log('Hello: ', nowDate);
		console.log('Hello: ', this.workCategory.content);

		this.startTime = new Date(nowDate);

		// tslint:disable-next-line: radix
		this.startTime.setHours(parseInt(this.startHour), parseInt(this.startMinute), 0, 0);
		console.log(this.startTime);

		if (this.endHour < this.startHour) {
			this.endTime = new Date(nowDate);
			this.endTime.setDate(nowDate.getDate() + 1);
		} else if ((this.endHour === this.startHour) && this.endMinute < this.startMinute) {
			this.endTime = new Date(nowDate);
			this.endTime.setDate(nowDate.getDate() + 1);
		} else {
			this.endTime = new Date(nowDate);
		}

		// tslint:disable-next-line: radix
		this.endTime.setHours(parseInt(this.endHour), parseInt(this.endMinute), 0, 0);
		console.log(this.endTime);

		let shiftName;
		let shiftDetail;

		if (this.shiftName.content) {
			shiftName = this.shiftName.content;
		} else {
			shiftName = this.shiftName;
		}

		if (this.workCategory.content) {
			shiftDetail = this.workCategory.content;
		} else {
			shiftDetail = this.workCategory;
		}

		const content = {
			'badge': this.badge,
			'nama': this.name,
			'namashift': shiftName,
			'detail': String(shiftDetail).toLowerCase(),
			'shiftStart': this.startTime,
			'shiftEnd': this.endTime
		};

		console.log('Content: ', content);

		this.managerService.updateShift(this.shiftID, content)
		.subscribe(
			response => {
				console.log(response);
				this.toastr.success('Succesfully edited the shift for ' + this.name);
				this.closeModal();

				if (String(shiftDetail).toLowerCase() === 'off') {
				} else if (shiftName.includes('STANDBY 1')) {
					shiftName = '$1';
				} else if (shiftName.includes('STANDBY 2')) {
					shiftName = '$2';
				} else if (shiftName.includes('STANDBY 3')) {
					shiftName = '$3';
				} else if (shiftName.includes('STANDBY ALL')) {
					shiftName = '$ALL';
				} else if (shiftName.includes('STANDBY SOD')) {
					shiftName = '$SOD';
				} else if (shiftName.includes('STANDBY DOUBLE SHIFT')) {
					shiftName = '$2S';
				} else if (shiftName.includes('STANDBY SME')) {
					shiftName = '$SME';
				} else if (shiftName.includes('STAGGERED 1')) {
					shiftName = 'STAG 1';
				} else if (shiftName.includes('STAGGERED 2')) {
					shiftName = 'STAG 2';
				} else if (shiftName.includes('STAGGERED 3')) {
					shiftName = 'STAG 3';
				} else if (shiftName.includes('STAGGERED')) {
					shiftName = 'STAG';
				} else if (shiftName.includes('STG 1')) {
					shiftName = 'STAG 1';
				} else if (shiftName.includes('STG 2')) {
					shiftName = 'STAG 2';
				} else if (shiftName.includes('STG 3')) {
					shiftName = 'STAG 3';
				} else if (shiftName.includes('OFFICE')) {
					shiftName = 'S1';
				} else if (shiftName.includes('1A')) {
					shiftName = 'S1A';
				} else if (shiftName.includes('1B')) {
					shiftName = 'S1B';
				} else if (shiftName.includes('1')) {
					shiftName = 'S1';
				} else if (shiftName.includes('2A')) {
					shiftName = 'S2A';
				} else if (shiftName.includes('2B')) {
					shiftName = 'S2B';
				} else if (shiftName.includes('2')) {
					shiftName = 'S2';
				} else if (shiftName.includes('3A')) {
					shiftName = 'S3A';
				} else if (shiftName.includes('3B')) {
					shiftName = 'S3B';
				} else if (shiftName.includes('3')) {
					shiftName = 'S3';
				}

				const index = this.events.findIndex(obj => {
					return obj.meta.shiftID === this.shiftID;
				});

				console.log(index);

				this.events[index] = {
					title: shiftName,
					start: this.startTime,
					meta: {
						incrementsBadgeTotal: false,
						shiftID: this.shiftID,
						shiftStart: this.startTime
					},
				};

				this.refresh.next();
				// location.reload();
				// this.navigate();
		},
		error => {
			console.log(error);
		});
	}

	getShiftDetail() {
		this.shiftID = this.event.meta.shiftID;

		this.managerService.getShiftDetailById(this.shiftID).subscribe(
			(response) => {
				this.shiftName = response.namashift;

				this.shiftStart = new Date(response.shiftStart);
				this.startHour = this.shiftStart.getHours();
				this.startMinute = this.shiftStart.getMinutes();

				this.shiftEnd = new Date(response.shiftEnd);
				this.endHour = this.shiftEnd.getHours();
				this.endMinute = this.shiftEnd.getMinutes();

				this.workCategory = String(response.detail).charAt(0).toUpperCase() + String(response.detail).slice(1);

				console.log('TEST: ', this.shiftName);
				console.log('TEST: ', this.startHour);
				console.log('TEST: ', this.startMinute);
				console.log('TEST: ', this.endHour);
				console.log('TEST: ', this.endMinute);
				console.log('TEST: ', this.shiftName);
				console.log('TEST: ', this.workCategory);
			},
			(error) => {
				console.log(error);
				this.showError(error.error);
			}
		);
	}
}
