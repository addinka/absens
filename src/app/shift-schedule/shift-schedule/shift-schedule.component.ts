import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarMonthViewDay } from 'angular-calendar';
import { ModalService } from 'carbon-components-angular';
import { ShiftChangeComponent } from '../../shift-change/shift-change/shift-change.component';
import { EmployeeService } from '../../core/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
	selector: 'app-shift-schedule',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './shift-schedule.component.html',
	styleUrls: ['./shift-schedule.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ShiftScheduleComponent implements OnInit {
	view: CalendarView = CalendarView.Month;

	viewDate: Date = new Date();

	events: CalendarEvent<{ incrementsBadgeTotal: boolean, shiftID: string, shiftStart: string }>[] = [
	];

	refresh: Subject<any> = new Subject();

	exchangeEvents: CalendarEvent<{ incrementsBadgeTotal: boolean, shiftID: string, shiftStart: string }>[] = [
	];

	currentEvent;
	currentDate;
	exchangeFlag;
	employeeID;
	switchName;
	switchID;
	myName;
	myID;
	chosenEvent;	
	loading = false;

	constructor(
		public modalService: ModalService,
		public employeeService: EmployeeService,
		private router: Router,
		public toastr: ToastrService,
		private activatedRoute: ActivatedRoute) {
			}

	ngOnInit() {
		this.getMyShift();
	}

	refreshPage() {
		this.refresh.next();
	}

	showSuccess() {
		this.toastr.success('Succesfully retrieved schedule');
		this.refresh.next();
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

	getMyShift() {
		this.employeeService.getMyShift()
		.subscribe(
			response => {
				if (response) {
					this.events = [];
					this.myName = response[0].name;
					this.myID = response[0].badge;
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
				}

				this.refresh.next();

				console.log(response);
				console.log(this.events);
		},
		error => {
			console.log(error);
		});
	}

	getEmployeeShift(id) {
		const content = {
			'badge': id
		};

		this.employeeService.getEmployeeShift(content)
		.subscribe(
			response => {
				if (response) {
					this.switchID = response[0].badge;
					this.switchName = response[0].nama;
				} else {
					this.switchID = '-';
					this.switchName = 'No Shift Found';
					this.loading = false;
				}


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
					} else if (response[i].namashift.includes('STAGGERED')) {
						response[i].namashift = 'STAG';
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
				}

				this.loading = false;

				console.log(response);
				console.log(this.exchangeEvents);
		},
		error => {
			console.log(error);
		});
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

	onClick(event) {
		console.log(event);
		this.currentEvent = event;
		this.exchangeFlag = false;

		if (event && event.length !== 0) {
			this.currentDate = moment(this.currentEvent[0].start).format('dddd, Do MMMM YYYY');
		}
	}

	exchange(event) {
		if (event.start < new(Date)) {
			this.showError('Cannot switch past shift, please choose a future shift');
			return;
		}

		this.chosenEvent = event;

		this.exchangeFlag = true;
	}

	search(e) {
		if (e.key === 'Enter') {
			this.getEmployeeShift(this.employeeID);
			this.loading = true;
		}
	}

	openModal(id) {
		if (this.switchID === '-') {
			return;
		}

		const modal = {
			component: ShiftChangeComponent,
			inputs: {
				events: this.exchangeEvents,
				exchangerEvent: this.chosenEvent,
				exchangerID: this.myID,
				exchangerName: this.myName,
				id: this.switchID,
				name: this.switchName
				},
		};

		this.modalService.create(modal);
	}
}
