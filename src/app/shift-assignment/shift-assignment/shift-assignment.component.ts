import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarMonthViewDay } from 'angular-calendar';
import { ModalService } from 'carbon-components-angular';
import { ShiftChangeComponent } from '../../shift-change/shift-change/shift-change.component';
import { CreateUpdateShiftComponent } from '../../create-update-shift/create-update-shift/create-update-shift.component';
import { EmployeeService } from '../../core/services/employee.service';
import { ManagerService } from '../../core/services/manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';

import { Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
	selector: 'app-shift-assignment',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './shift-assignment.component.html',
	styleUrls: ['./shift-assignment.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ShiftAssignmentComponent implements OnInit {
	view: CalendarView = CalendarView.Month;

	viewDate: Date = new Date();

	events: CalendarEvent<{ incrementsBadgeTotal: boolean, shiftID: string, shiftStart: string }>[] = [
	];

	refresh: Subject<any> = new Subject();

	exchangeEvents: CalendarEvent<{ incrementsBadgeTotal: boolean, shiftID: string, shiftStart: string }>[] = [
	];

	currentEvent;
	calendarDate;
	currentDate;
	exchangeFlag;
	createFlag;
	editFlag;
	employeeID;
	switchName;
	switchID;
	myName;
	myID;
	loading = false;
	retrieveLoading = false;
	chosenEvent;
	findEmployeeID;

	public employees: any = [];
	employeeValue: any = '';

	constructor(
		public modalService: ModalService,
		public employeeService: EmployeeService,
		public managerService: ManagerService,
		private router: Router,
		public toastr: ToastrService,
		private activatedRoute: ActivatedRoute) {
	}

	ngOnInit() {
		this.searchEmployees('');
	}

	searchEmployees(filter?) {
		const content = {
			'name': filter 
		};

		this.managerService.getAllEmployees(content).pipe(debounceTime(0))
			.subscribe(
				response => {
					this.employees = [];

					response.forEach(element => {
						const newEmployees = {
							'id': element._id,
							'content': element.name
						};

						this.employees.push(newEmployees);
					});


					console.log(this.employees);

				},
				error => {
					console.log(error);
				});
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

	getEmpShift(id) {
		const content = {
			'badge': id
		};
		console.log(id);
		if (id !== null || id !== undefined || id !== '') {
			this.employeeService.getEmployeeShift(content)
			.subscribe(
				response => {
					if (response) {
						this.events = [];
						for (let i = 0; i < response.length; i++) {
							const shiftDate = new Date(response[i].shiftStart);
							if (response[i].detail === 'off') {
								continue;
							} else if (response[i].namashift.includes('STANDBY 1')) {
								response[i].namashift = '$1';
							} else if (response[i].namashift.includes('STANDBY 2')) {
								response[i].namashift = '$2';
							} else if (response[i].namashift.includes('STANDBY 3')) {
								response[i].namashift = '$3';
							} else if (response[i].namashift.includes('STANDBY ALL')) {
								response[i].namashift = '$ALL';
							} else if (response[i].namashift.includes('STANDBY SOD')) {
								response[i].namashift = '$SOD';
							} else if (response[i].namashift.includes('STANDBY DOUBLE SHIFT')) {
								response[i].namashift = '$2S';
							} else if (response[i].namashift.includes('STANDBY SME')) {
								response[i].namashift = '$SME';
							} else if (response[i].namashift.includes('STAGGERED 1')) {
								response[i].namashift = 'STAG 1';
							} else if (response[i].namashift.includes('STAGGERED 2')) {
								response[i].namashift = 'STAG 2';
							} else if (response[i].namashift.includes('STAGGERED 3')) {
								response[i].namashift = 'STAG 3';
							} else if (response[i].namashift.includes('STAGGERED')) {
								response[i].namashift = 'STAG';
							} else if (response[i].namashift.includes('STG 1')) {
								response[i].namashift = 'STAG 1';
							} else if (response[i].namashift.includes('STG 2')) {
								response[i].namashift = 'STAG 2';
							} else if (response[i].namashift.includes('STG 3')) {
								response[i].namashift = 'STAG 3';
							} else if (response[i].namashift.includes('OFFICE')) {
								response[i].namashift = 'S1';
							} else if (response[i].namashift.includes('1A')) {
								response[i].namashift = 'S1A';
							} else if (response[i].namashift.includes('1B')) {
								response[i].namashift = 'S1B';
							} else if (response[i].namashift.includes('1')) {
								response[i].namashift = 'S1';
							} else if (response[i].namashift.includes('2A')) {
								response[i].namashift = 'S2A';
							} else if (response[i].namashift.includes('2B')) {
								response[i].namashift = 'S2B';
							} else if (response[i].namashift.includes('2')) {
								response[i].namashift = 'S2';
							} else if (response[i].namashift.includes('3A')) {
								response[i].namashift = 'S3A';
							} else if (response[i].namashift.includes('3B')) {
								response[i].namashift = 'S3B';
							} else if (response[i].namashift.includes('3')) {
								response[i].namashift = 'S3';
							} else {
								continue;
							}

							this.events.push(
								{
									title: response[i].namashift,
									start: new Date(shiftDate),
									meta: {
										incrementsBadgeTotal: false,
										shiftID: response[i]._id,
										shiftStart: response[i].shiftStart
									},
								}
							);
						}
					} else {
						this.events = [];
						this.showError('No Shift for that employee is found');
						this.retrieveLoading = false;
					}

					this.refresh.next();

					this.retrieveLoading = false;
					console.log(response);
					console.log(this.events);
				},
				error => {
					console.log(error);
		});
		} else {
			this.retrieveLoading = false;
		}

	}

	loadSchedule() {
		this.refresh.next();
	}

	getEmployeeShift(id) {
		this.loading = true;

		const content = {
			'badge': id
		};

		this.employeeService.getEmployeeShift(content)
			.subscribe(
				response => {
					console.log('employee shift:', response);
					if (!response) {
						this.switchID = '-';
						this.switchName = 'No Shift Found';
						this.loading = false;
					} else {
						this.switchID = response[0].badge;
						this.switchName = response[0].nama;
						for (let i = 0; i < response.length; i++) {
							const start = new Date(response[i].shiftStart);
							if (response[i].detail === 'off') {
								continue;
							} else if (response[i].namashift.includes('STANDBY 1')) {
								response[i].namashift = '$1';
							} else if (response[i].namashift.includes('STANDBY 2')) {
								response[i].namashift = '$2';
							} else if (response[i].namashift.includes('STANDBY 3')) {
								response[i].namashift = '$3';
							} else if (response[i].namashift.includes('STANDBY ALL')) {
								response[i].namashift = '$ALL';
							} else if (response[i].namashift.includes('STANDBY SOD')) {
								response[i].namashift = '$SOD';
							} else if (response[i].namashift.includes('STANDBY DOUBLE SHIFT')) {
								response[i].namashift = '$2S';
							} else if (response[i].namashift.includes('STANDBY SME')) {
								response[i].namashift = '$SME';
							} else if (response[i].namashift.includes('STAGGERED 1')) {
								response[i].namashift = 'STAG 1';
							} else if (response[i].namashift.includes('STAGGERED 2')) {
								response[i].namashift = 'STAG 2';
							} else if (response[i].namashift.includes('STAGGERED 3')) {
								response[i].namashift = 'STAG 3';
							} else if (response[i].namashift.includes('STAGGERED')) {
								response[i].namashift = 'STAG';
							} else if (response[i].namashift.includes('STG 1')) {
								response[i].namashift = 'STAG 1';
							} else if (response[i].namashift.includes('STG 2')) {
								response[i].namashift = 'STAG 2';
							} else if (response[i].namashift.includes('STG 3')) {
								response[i].namashift = 'STAG 3';
							} else if (response[i].namashift.includes('OFFICE')) {
								response[i].namashift = 'S1';
							} else if (response[i].namashift.includes('1A')) {
								response[i].namashift = 'S1A';
							} else if (response[i].namashift.includes('1B')) {
								response[i].namashift = 'S1B';
							} else if (response[i].namashift.includes('1')) {
								response[i].namashift = 'S1';
							} else if (response[i].namashift.includes('2A')) {
								response[i].namashift = 'S2A';
							} else if (response[i].namashift.includes('2B')) {
								response[i].namashift = 'S2B';
							} else if (response[i].namashift.includes('2')) {
								response[i].namashift = 'S2';
							} else if (response[i].namashift.includes('3A')) {
								response[i].namashift = 'S3A';
							} else if (response[i].namashift.includes('3B')) {
								response[i].namashift = 'S3B';
							} else if (response[i].namashift.includes('3')) {
								response[i].namashift = 'S3';
							} else {
								continue;
							}

							this.exchangeEvents.push(
								{
									title: response[i].namashift,
									start: new Date(start),
									meta: {
										incrementsBadgeTotal: false,
										shiftID: response[i]._id,
										shiftStart: response[i].shiftStart
									},
								}
							);

							this.loading = false;
						}

					}

					this.refresh.next();
					console.log(this.exchangeEvents);

				},
				error => {
					this.loading = false;
					console.log(error);
				});
	}

	beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
		body.forEach((day) => {
			day.badgeTotal = day.events.filter(
				(event) => event.meta.incrementsBadgeTotal
			).length;

			day.events.sort(function (a, b) {
				let nameA = a.title.toUpperCase(); // ignore upper and lowercase
				let nameB = b.title.toUpperCase(); // ignore upper and lowercase
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

	onClick(event) {
		console.log(event);
		this.currentEvent = event.events;
		this.exchangeFlag = false;
		this.createFlag = false;

		this.calendarDate = event.date;

		if (this.currentEvent && this.currentEvent.length !== 0) {
			this.currentDate = moment(this.currentEvent[0].start).format('dddd, Do MMMM YYYY');
		} else {
			this.currentDate = moment(event.date).format('dddd, Do MMMM YYYY');
		}
	}

	exchange(event) {
		if (event.start < new (Date)) {
			this.showError('Cannot assign past shift, please choose a future shift');
			return;
		}

		this.chosenEvent = event;

		this.exchangeFlag = true;
	}

	createShift() {
		this.createFlag = true;
	}

	createUpdateShift(event?) {
		const today = new(Date);
		if (this.calendarDate < today.setHours(0, 0, 0, 0)) {
			this.showError('Cannot create a new shift for a date in the past, please check your chosen date');
			return;
		}

		const modal = {
			component: CreateUpdateShiftComponent,
			inputs: {
				events: this.events,
				refresh: this.refresh,
				badge: this.myID,
				name: this.myName,
				currentDate: this.calendarDate,
				event: '-'
			},
		};

		this.modalService.create(modal);
		this.currentEvent = [];
	}

	editShift(event) {
		console.log(event);

		this.editFlag = true;

		const today = new(Date);
		if (this.calendarDate < today.setHours(0, 0, 0, 0)) {
			this.showError('Cannot edit a shift for a date in the past, please check your chosen date');
			return;
		} else {
			this.chosenEvent = event;

			const modal = {
				component: CreateUpdateShiftComponent,
				inputs: {
					events: this.events,
					refresh: this.refresh,
					badge: this.myID,
					name: this.myName,
					currentDate: this.calendarDate,
					event: this.chosenEvent
				},
			};

			this.modalService.create(modal);
			this.currentEvent = [];
		}

	}

	delete(event) {
		console.log(event);

		if (event.start < new (Date)) {
			this.showError('Cannot delete past shift, please choose a future shift to delete');
			return;
		}

		const index = this.events.findIndex((obj) => {
			return obj.meta.shiftID === event.meta.shiftID;
		});

		console.log(index);

		this.events.splice(index, 1);
		this.refresh.next();
		this.currentEvent = [];
		this.currentDate = undefined;

		this.managerService.deleteShift(event.meta.shiftID)
		.subscribe(
			response => {
				console.log(response);
				this.toastr.success('Succesfully deleted shift of ' + this.myName);
				// this.navigate();
		},
		error => {
			console.log(error);
		});
	}

	navigate() { this.router.navigate(['/dashboard']); }

	search(e) {
		console.log(this.findEmployeeID);
		if (this.findEmployeeID) {
			if (this.findEmployeeID.length !== 0) {
				this.getEmpShift(this.findEmployeeID.id);
				this.myName = this.findEmployeeID.content;
				this.myID = this.findEmployeeID.id;
				this.retrieveLoading = true;
			} else {
				this.myName = '';
				this.myID = '';
				this.retrieveLoading = false;
				this.currentEvent = [];
				this.events = [];
			}
		}

	}

	search2(e) {
		console.log(this.employeeID);
		if (this.employeeID.length !== 0) {
			this.getEmployeeShift(this.employeeID.id);
		} else {
			this.exchangeEvents = [];
			this.loading = false;
			this.switchName = '';
		}

	}


	searchEmployee(e) {

		if (e.key === 'Enter' && this.findEmployeeID) {
			console.log('Find Employee ID:', this.findEmployeeID);
			if (this.findEmployeeID !== []) {
				this.getEmpShift(this.findEmployeeID.id);
				this.retrieveLoading = true;
			}
		}

	}

	openModal(id) {
		if (this.switchID === '-') {
			return;
		}

		const modal = {
			component: ShiftChangeComponent,
			inputs: {
				events: '-',
				exchangerEvent: this.chosenEvent,
				exchangerID: this.myID,
				exchangerName: this.myName,
				id: this.switchID,
				name: this.switchName
			},
		};

		this.modalService.create(modal);
		this.currentEvent = [];
		this.exchangeFlag = false;
	}
}

