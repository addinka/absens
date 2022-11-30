import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from 'carbon-components-angular';
import { CancelModalComponent } from '../../cancel-modal/cancel-modal/cancel-modal.component';
import { EmployeeService } from '../../core/services/employee.service';
import { UtilsService } from '../../core/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SampleModalComponent } from '../../sample-modal/sample-modal/sample-modal.component';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
	selector: 'app-create-work-assignment-request',
	templateUrl: './create-work-assignment-request.component.html',
	styleUrls: ['./create-work-assignment-request.component.scss']
})

export class CreateWorkAssignmentRequestComponent implements OnInit {
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

	assignmentDate: any = new Date();
	assignmentEndDate: any = new Date();

	minDate: any = new Date();
	maxDate: any = new Date();

	remarks: any;

	weekdayCount = 0;
	weekendCount = 0;

	otHour;
	otMinutes;

	weekendOTHour;
	weekendOTMinutes;

	submitForm: FormGroup;

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

	public model: any;
	public checked = true;
	public type: any;

	position: any;
	latitude: any;
	longitude: any;
	address: any;
	googleAPIKey = 'AIzaSyBd55pe5Di9_o0R4Gtp1kLjHTs4uz_EHEM';

	constructor (
		@Inject(DOCUMENT) private document: Document,
		public modalService: ModalService,
		public employeeService: EmployeeService,
		public utilsService: UtilsService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		public toastr: ToastrService,
	) { }

	async ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			this.getUserInfo();
			this.getEmployeeAssignmentCount();
		});

		this.submitForm = this.fb.group({
			assignmentDate: [new Date(), Validators.required],
			assignmentEndDate: [new Date(), Validators.required]
		});

		this.onChecked();
		await this.getCurrentPosition();
		this.address = await this.utilsService.getAddress(this.position.coords.latitude, this.position.coords.longitude);
	}

	getUserInfo() {
		this.maxDate.setDate((new Date().getDate() + 1));
		this.employeeService.getUserDashboard()
			.subscribe(
				response => {
					console.log(response);
					if (response.isNew === 'Y') {
						this.router.navigate(['/account']);
						this.toastr.error('You have to fill your account information before anything');
						this.employeeService.headerStatusTrueEmitter().emit();
					} else if (response.isChecked === 'N') {
						this.router.navigate(['/daily-checkup']);
						this.toastr.error('You have to do your daily checkup before doing anything for today');
						this.employeeService.headerStatusTrueEmitter().emit();
					}
				},
				error => {
					this.toastr.error(error.error);
				});
	}

	addAssignmentDate(events: MatDatepickerInputEvent<Date>) {
		this.assignmentDate = new Date(events.value);
		this.maxDate.setDate((this.assignmentDate.getDate() + 1));
		console.log('TEST: ', this.assignmentDate.getDate() + 1);
		console.log('Max Date: ', this.maxDate);
		// console.log('startdate:', this.startDate);
	}

	addAssignmentEndDate(events: MatDatepickerInputEvent<Date>) {
		this.assignmentEndDate = new Date(events.value);
		// console.log('startdate:', this.startDate);
	}

	// keyPress(event) {
	// 	const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/;
	// 	// const inputChar = String.fromCharCode(event).charAt;
	// 	const input = String.fromCharCode(event).charAt.toString();
	// 	if (!timePattern.test(input)) {
	// 		// invalid character, prevent input
	// 		event.preventDefault();
	// 	}
	// }

	onKeyUpStart(event) {
		if (this.startTime.startsWith('0') || this.startTime.startsWith('1') || this.startTime.startsWith('2')) {
			if (this.startTime.charAt(0) === '2' && this.startTime.length > 1) {
				if (this.startTime.charAt(1) === '0' ||
					this.startTime.charAt(1) === '1' ||
					this.startTime.charAt(1) === '2' ||
					this.startTime.charAt(1) === '3') {
					if (this.startTime.length === 2) {
						this.startTime = this.startTime + ':';
					} else if (this.startTime.length === 4) {
						if (this.startTime.charAt(3) === '0' ||
							this.startTime.charAt(3) === '1' ||
							this.startTime.charAt(3) === '2' ||
							this.startTime.charAt(3) === '3' ||
							this.startTime.charAt(3) === '4' ||
							this.startTime.charAt(3) === '5') {
						} else {
							this.startTime = this.startTime.slice(0, -1);
						}
					} else if (this.startTime.length === 5) {
						if (this.startTime.charAt(4) === '0' ||
							this.startTime.charAt(4) === '1' ||
							this.startTime.charAt(4) === '2' ||
							this.startTime.charAt(4) === '3' ||
							this.startTime.charAt(4) === '4' ||
							this.startTime.charAt(4) === '5' ||
							this.startTime.charAt(4) === '6' ||
							this.startTime.charAt(4) === '7' ||
							this.startTime.charAt(4) === '8' ||
							this.startTime.charAt(4) === '9') {
						} else {
							this.startTime = this.startTime.slice(0, -1);
						}
					} else if (this.startTime.length > 5) {
						this.startTime = this.startTime.slice(0, -1);
					}
				} else {
					this.startTime = this.startTime.slice(0, -1);
				}
			} else if ((this.startTime.charAt(0) === '1' && this.startTime.length > 1) ||
						(this.startTime.charAt(0) === '0' && this.startTime.length > 1)) {
				if (this.startTime.charAt(1) === '0' ||
					this.startTime.charAt(1) === '1' ||
					this.startTime.charAt(1) === '2' ||
					this.startTime.charAt(1) === '3' ||
					this.startTime.charAt(1) === '4' ||
					this.startTime.charAt(1) === '5' ||
					this.startTime.charAt(1) === '6' ||
					this.startTime.charAt(1) === '7' ||
					this.startTime.charAt(1) === '8' ||
					this.startTime.charAt(1) === '9') {
					if (this.startTime.length === 2) {
						this.startTime = this.startTime + ':';
					} else if (this.startTime.length === 4) {
						if (this.startTime.charAt(3) === '0' ||
							this.startTime.charAt(3) === '1' ||
							this.startTime.charAt(3) === '2' ||
							this.startTime.charAt(3) === '3' ||
							this.startTime.charAt(3) === '4' ||
							this.startTime.charAt(3) === '5') {
						} else {
							this.startTime = this.startTime.slice(0, -1);
						}
					} else if (this.startTime.length === 5) {
						if (this.startTime.charAt(4) === '0' ||
							this.startTime.charAt(4) === '1' ||
							this.startTime.charAt(4) === '2' ||
							this.startTime.charAt(4) === '3' ||
							this.startTime.charAt(4) === '4' ||
							this.startTime.charAt(4) === '5' ||
							this.startTime.charAt(4) === '6' ||
							this.startTime.charAt(4) === '7' ||
							this.startTime.charAt(4) === '8' ||
							this.startTime.charAt(4) === '9') {
						} else {
							this.startTime = this.startTime.slice(0, -1);
						}
					} else if (this.startTime.length > 5) {
						this.startTime = this.startTime.slice(0, -1);
					}
				} else {
					this.startTime = this.startTime.slice(0, -1);
				}
			}
		} else {
			this.startTime = this.startTime.slice(0, -1);
		}
	}

	onKeyUpEnd(event) {
		if (this.endTime.startsWith('0') || this.endTime.startsWith('1') || this.endTime.startsWith('2')) {
			if (this.endTime.charAt(0) === '2' && this.endTime.length > 1) {
				if (this.endTime.charAt(1) === '0' ||
					this.endTime.charAt(1) === '1' ||
					this.endTime.charAt(1) === '2' ||
					this.endTime.charAt(1) === '3') {
					if (this.endTime.length === 2) {
						this.endTime = this.endTime + ':';
					} else if (this.endTime.length === 4) {
						if (this.endTime.charAt(3) === '0' ||
							this.endTime.charAt(3) === '1' ||
							this.endTime.charAt(3) === '2' ||
							this.endTime.charAt(3) === '3' ||
							this.endTime.charAt(3) === '4' ||
							this.endTime.charAt(3) === '5') {
						} else {
							this.endTime = this.endTime.slice(0, -1);
						}
					} else if (this.endTime.length === 5) {
						if (this.endTime.charAt(4) === '0' ||
							this.endTime.charAt(4) === '1' ||
							this.endTime.charAt(4) === '2' ||
							this.endTime.charAt(4) === '3' ||
							this.endTime.charAt(4) === '4' ||
							this.endTime.charAt(4) === '5' ||
							this.endTime.charAt(4) === '6' ||
							this.endTime.charAt(4) === '7' ||
							this.endTime.charAt(4) === '8' ||
							this.endTime.charAt(4) === '9') {
						} else {
							this.endTime = this.endTime.slice(0, -1);
						}
					} else if (this.endTime.length > 5) {
						this.endTime = this.endTime.slice(0, -1);
					}
				} else {
					this.endTime = this.endTime.slice(0, -1);
				}
			} else if ((this.endTime.charAt(0) === '1' && this.endTime.length > 1) ||
						(this.endTime.charAt(0) === '0' && this.endTime.length > 1)) {
				if (this.endTime.charAt(1) === '0' ||
					this.endTime.charAt(1) === '1' ||
					this.endTime.charAt(1) === '2' ||
					this.endTime.charAt(1) === '3' ||
					this.endTime.charAt(1) === '4' ||
					this.endTime.charAt(1) === '5' ||
					this.endTime.charAt(1) === '6' ||
					this.endTime.charAt(1) === '7' ||
					this.endTime.charAt(1) === '8' ||
					this.endTime.charAt(1) === '9') {
					if (this.endTime.length === 2) {
						this.endTime = this.endTime + ':';
					} else if (this.endTime.length === 4) {
						if (this.endTime.charAt(3) === '0' ||
							this.endTime.charAt(3) === '1' ||
							this.endTime.charAt(3) === '2' ||
							this.endTime.charAt(3) === '3' ||
							this.endTime.charAt(3) === '4' ||
							this.endTime.charAt(3) === '5') {
						} else {
							this.endTime = this.endTime.slice(0, -1);
						}
					} else if (this.endTime.length === 5) {
						if (this.endTime.charAt(4) === '0' ||
							this.endTime.charAt(4) === '1' ||
							this.endTime.charAt(4) === '2' ||
							this.endTime.charAt(4) === '3' ||
							this.endTime.charAt(4) === '4' ||
							this.endTime.charAt(4) === '5' ||
							this.endTime.charAt(4) === '6' ||
							this.endTime.charAt(4) === '7' ||
							this.endTime.charAt(4) === '8' ||
							this.endTime.charAt(4) === '9') {
						} else {
							this.endTime = this.endTime.slice(0, -1);
						}
					} else if (this.endTime.length > 5) {
						this.endTime = this.endTime.slice(0, -1);
					}
				} else {
					this.endTime = this.endTime.slice(0, -1);
				}
			}
		} else {
			this.endTime = this.endTime.slice(0, -1);
		}
	}

	onChecked() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));

		buttonSubmitElement.disabled = false;
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

	cancelModal() {
		this.modalService.create({
			component: CancelModalComponent,
			inputs: { }
		});
	}

	openSampleModal() {
		this.modalService.create({
			component: SampleModalComponent,
			inputs: {
				type: 'WorkAssignment'
			}
		});
	}

	reqAssignment() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		const nowDate = new Date();
		nowDate.setHours(0, 0, 0, 0);
		if (this.startHour === undefined || this.startMinute === undefined) {
			this.toastr.error('Please enter the correct start time', 'Invalid Time');
		} else if (this.endHour === undefined || this.endMinute === undefined) {
			this.toastr.error('Please enter the correct end time', 'Invalid Time');
		} else if (this.remarks === undefined || this.remarks === '') {
			this.toastr.error('Please enter your remarks');
		} else if (this.address === undefined || this.address === '') {
			this.toastr.error('Please allow location services to get your location to submit work assignment');
		} else {
			/* if (parseInt(currHour) < getHourNewDate || (parseInt(currHour) == getHourNewDate && parseInt(currMinute) < getMinuteNewDate)) {
				this.toastr.error('Time cannot be in the past.', 'Invalid Time');
			} else { */
			const currDate = new Date(this.assignmentDate);

			this.startTime = new Date(this.assignmentDate);
			// tslint:disable-next-line: radix
			this.startTime.setHours(parseInt(this.startHour), parseInt(this.startMinute), 0, 0);
			console.log(this.startTime);

			this.endTime = new Date(this.assignmentEndDate);
			// tslint:disable-next-line: radix
			this.endTime.setHours(parseInt(this.endHour), parseInt(this.endMinute), 0, 0);
			console.log(this.endTime);

			if (currDate < nowDate) {
				this.toastr.error('Work Assignment Date cannot be in the past.', 'Invalid Work Assignment Date');
			} else if (this.endTime < this.startTime) {
				this.toastr.error('Start Time cannot be after End Time.', 'Invalid Start/End Time');
			} else {
				buttonSubmitElement.disabled = true;
				const timeZone = new Date().toString().match(/([-\+][0-9]+)\s/)[1];
				this.employeeService.requestAssignment({
					'geoTag': {
						'coordinates': {
							'lat': this.position.coords.latitude,
							'lon': this.position.coords.longitude
						},
						'description': this.address.results[0].formatted_address
					},
					'plannedStart': this.startTime,
					'plannedEnd': this.endTime,
					'remark': this.remarks,
					'timezone': timeZone
				})
					.subscribe(
						response => {
							console.log(response);
							this.openSampleModal();
						},
						error => {
							buttonSubmitElement.disabled = false;
							console.log(error);
							if (error.error === '' || error.error === null || error.error === undefined) {
								this.toastr.error('An unknown error occured');
							} else {
								this.toastr.error(error.error);
							}
						});
			}
		}
	}

	getEmployeeAssignmentCount() {
		this.employeeService.getAssignmentCount()
			.subscribe(
				response => {
					if (response !== null) {
						this.weekdayCount = response.weekdayCount;
						this.weekendCount = response.weekendCount;

						this.weekdayCount = this.weekdayCount + this.weekendCount;

						this.otHour = Math.floor(this.weekdayCount / 60);
						this.otMinutes = this.weekdayCount % 60;

						this.weekendOTHour = Math.floor(this.weekendCount / 60);
						this.weekendOTMinutes = this.weekendCount % 60;
					}
				}
			);
	}

	getPosition() {
		return new Promise((res, rej) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(success, error);
			} else {
				console.log('Sorry, your browser does not support HTML5 geolocation.');
			}

			function success(position) {
				res(position);
			}

			function error(error) {
				console.log(error);
			}
		});
	}

	async getCurrentPosition() {
		this.position = await this.getPosition();
	}
}
