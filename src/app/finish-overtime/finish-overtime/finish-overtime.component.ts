import { Component, Injector, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import {
	ModalModule,
	ModalButton,
	AlertModalType,
	ModalButtonType,
	ModalService,
	BaseModal,
} from 'carbon-components-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../core/services/utils.service';
import { ManagerService } from '../../core/services/manager.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
	selector: 'app-finish-overtime',
	templateUrl: './finish-overtime.component.html',
	styleUrls: ['./finish-overtime.component.scss'],
})
export class FinishOvertimeComponent extends BaseModal {
	_id: string;
	type: string;

	public startHour: string;
	invalidStartHour = false;

	public startMinute: string;
	invalidStartMinute = false;

	public endHour: string;
	invalidEndHour = false;

	public endMinute: string;
	invalidEndMinute = false;

	overtimeDate: any;
	overtimeEndDate: any;

	minDate: any = new Date();
	maxDate: any = new Date();

	submitForm: FormGroup;

	// declare NgModel values
	remarks: any;

	public hour: any = [
		{
			content: '00',
		},
		{
			content: '01',
		},
		{
			content: '02',
		},
		{
			content: '03',
		},
		{
			content: '04',
		},
		{
			content: '05',
		},
		{
			content: '06',
		},
		{
			content: '07',
		},
		{
			content: '08',
		},
		{
			content: '09',
		},
		{
			content: '10',
		},
		{
			content: '11',
		},
		{
			content: '12',
		},
		{
			content: '13',
		},
		{
			content: '14',
		},
		{
			content: '15',
		},
		{
			content: '16',
		},
		{
			content: '17',
		},
		{
			content: '18',
		},
		{
			content: '19',
		},
		{
			content: '20',
		},
		{
			content: '21',
		},
		{
			content: '22',
		},
		{
			content: '23',
		},
	];

	public minute: any = [
		{
			content: '00'
		},
		{
			content: '01',
		},
		{
			content: '02',
		},
		{
			content: '03',
		},
		{
			content: '04',
		},
		{
			content: '05',
		},
		{
			content: '06',
		},
		{
			content: '07',
		},
		{
			content: '08',
		},
		{
			content: '09',
		},
		{
			content: '10',
		},
		{
			content: '11',
		},
		{
			content: '12',
		},
		{
			content: '13',
		},
		{
			content: '14',
		},
		{
			content: '15',
		},
		{
			content: '16',
		},
		{
			content: '17',
		},
		{
			content: '18',
		},
		{
			content: '19',
		},
		{
			content: '20',
		},
		{
			content: '21',
		},
		{
			content: '22',
		},
		{
			content: '23',
		},
		{
			content: '24',
		},
		{
			content: '25',
		},
		{
			content: '26',
		},
		{
			content: '27',
		},
		{
			content: '28',
		},
		{
			content: '29',
		},
		{
			content: '30',
		},
		{
			content: '31',
		},
		{
			content: '32',
		},
		{
			content: '33',
		},
		{
			content: '34',
		},
		{
			content: '35',
		},
		{
			content: '36',
		},
		{
			content: '37',
		},
		{
			content: '38',
		},
		{
			content: '39',
		},
		{
			content: '40',
		},
		{
			content: '41',
		},
		{
			content: '42',
		},
		{
			content: '43',
		},
		{
			content: '44',
		},
		{
			content: '45',
		},
		{
			content: '46',
		},
		{
			content: '47',
		},
		{
			content: '48',
		},
		{
			content: '49',
		},
		{
			content: '50',
		},
		{
			content: '51',
		},
		{
			content: '52',
		},
		{
			content: '53',
		},
		{
			content: '54',
		},
		{
			content: '55',
		},
		{
			content: '56',
		},
		{
			content: '57',
		},
		{
			content: '58',
		},
		{
			content: '59',
		},
	];

	position: any;
	latitude: any;
	longitude: any;
	address: any;
	googleAPIKey = 'AIzaSyBd55pe5Di9_o0R4Gtp1kLjHTs4uz_EHEM';

	constructor(
		private router: Router,
		protected injector: Injector,
		public employeeService: EmployeeService,
		protected managerService: ManagerService,
		public toastr: ToastrService,
		private fb: FormBuilder,
		public utilsService: UtilsService
	) {
		super();
		this._id = this.injector.get('_id');
		this.type = this.injector.get('type');
	}

	async ngOnInit() {
		this.maxDate.setDate(this.maxDate.getDate() + 1);

		if (this.type === 'Overtime') {
			this.managerService.getOvertimeDetailById(this._id).subscribe(
				(response) => {
					this.submitForm = this.fb.group({
						overtimeDate: [response.plannedStart, Validators.required],
						overtimeEndDate: [response.plannedEnd, Validators.required]
					});

					this.overtimeDate = new Date(response.plannedStart);
					this.startHour = String(this.overtimeDate.getHours());
					this.startMinute = String(this.overtimeDate.getMinutes());

					if (this.startHour === '0') {
						this.startHour = '00';
					}

					if (this.startMinute === '0') {
						this.startMinute = '00';
					}

					this.overtimeEndDate = new Date(response.plannedEnd);
					console.log(this.overtimeEndDate);

					this.endHour = String(this.overtimeEndDate.getHours());
					this.endMinute = String(this.overtimeEndDate.getMinutes());

					if (this.endHour === '0') {
						this.endHour = '00';
					}

					if (this.endMinute === '0') {
						this.endMinute = '00';
					}
				},
				(error) => {
					console.log(error);
				}
			);
		} else if (this.type === 'WorkAssignment') {
			this.managerService.getAssignmentDetailById(this._id).subscribe(
				(response) => {
					this.submitForm = this.fb.group({
						overtimeDate: [response.plannedStart, Validators.required],
						overtimeEndDate: [response.plannedEnd, Validators.required]
					});

					this.overtimeDate = new Date(response.plannedStart);
					this.startHour = String(this.overtimeDate.getHours());
					this.startMinute = String(this.overtimeDate.getMinutes());

					if (this.startHour === '0') {
						this.startHour = '00';
					}

					if (this.startMinute === '0') {
						this.startMinute = '00';
					}

					this.overtimeEndDate = new Date(response.plannedEnd);

					this.endHour = String(this.overtimeEndDate.getHours());
					this.endMinute = String(this.overtimeEndDate.getMinutes());

					if (this.endHour === '0') {
						this.endHour = '00';
					}

					if (this.endMinute === '0') {
						this.endMinute = '00';
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}

		await this.getCurrentPosition();
		this.address = await this.utilsService.getAddress(this.position.coords.latitude, this.position.coords.longitude);
	}

	addOvertimeDate(events: MatDatepickerInputEvent<Date>) {
		this.overtimeDate = new Date(events.value);
		this.maxDate.setDate((this.overtimeDate.getDate() + 1));
		// console.log('startdate:', this.startDate);
	}

	addOvertimeEndDate(events: MatDatepickerInputEvent<Date>) {
		this.overtimeEndDate = new Date(events.value);
		// console.log('startdate:', this.startDate);
	}

	showSuccess() {
		this.toastr.success('Succesfully finished overtime/work assignment');
		location.reload();
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

	onSelectedHourStart(event) {
		if (event.length === 0) {
			this.invalidStartHour = true;
			return;
		}

		console.log(event);
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

		const selected = event.item.content;
		this.invalidStartMinute = false;
		console.log('Selected: ', selected);
		this.startMinute = selected;
	}

	onSelectedHourEnd(event) {
		if (event.length === 0) {
			this.invalidEndHour = true;
			return;
		}

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

		const selected = event.item.content;
		this.invalidEndMinute = false;
		console.log('Selected: ', selected);
		this.endMinute = selected;
	}

	reportOvertime() {

		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
			buttonSubmitElement.disabled = true;

		if (this.startHour === undefined || this.startMinute === undefined) {
			this.showError('Please insert a correct Start Time');
		} else if (this.endHour === undefined || this.endMinute === undefined) {
			this.showError('Please insert a correct End Time');
		} else if (this.address === undefined || this.address === '') {
			this.toastr.error('Please allow location services to get your location to submit overtime / work assignment');
		} else {
			if (this.type === 'Overtime') {
				this.managerService.getOvertimeDetailById(this._id).subscribe(
					(response) => {
						const actualStart = new Date(this.overtimeDate);
						console.log('Actual Start Before: ', actualStart);
						// tslint:disable-next-line: radix
						actualStart.setHours(
							parseInt(this.startHour),
							parseInt(this.startMinute),
							0, 0
						);
						console.log('Actual Start After: ', actualStart);

						let actualEnd;

						actualEnd = new Date(this.overtimeEndDate);

						console.log('Actual End Before: ', actualEnd);
						// tslint:disable-next-line: radix
						actualEnd.setHours(
							parseInt(this.endHour),
							parseInt(this.endMinute),
							0, 0
						);
						console.log('Actual End After: ', actualEnd);

						if (actualEnd < actualStart) {
							this.showError('Failed to finish, End Date should be after Start Date');
							return;
						} else if ((actualEnd.getTime() - actualStart.getTime()) >= 86400000) {
							this.showError('Failed to finish, cannot have more than 24 hours overtime');
							return;
						} else {
							this.employeeService
							.checkOutOvertime({
								'geoTag': {
									'coordinates': {
										'lat': this.position.coords.latitude,
										'lon': this.position.coords.longitude
									},
									'description': this.address.results[0].formatted_address
								},
								_id: this._id,
								actualStart: actualStart,
								actualEnd: actualEnd,
								remark: this.remarks,
							})
							.subscribe(
								(response) => {
									console.log(response);
									this.showSuccess();
								},
								(error) => {
									console.log(error);
									this.showError(error.error);
								}
							);
						}
					},
					(error) => {
						console.log(error);
					}
				);
			} else if (this.type === 'WorkAssignment') {
				this.managerService.getAssignmentDetailById(this._id).subscribe(
					(response) => {
						const actualStart = new Date(this.overtimeDate);
						console.log('Actual Start Before: ', actualStart);
						// tslint:disable-next-line: radix
						actualStart.setHours(
							parseInt(this.startHour),
							parseInt(this.startMinute),
							0
						);
						console.log('Actual Start After: ', actualStart);

						let actualEnd;

						actualEnd = new Date(this.overtimeEndDate);

						console.log('Actual End Before: ', actualEnd);
						// tslint:disable-next-line: radix
						actualEnd.setHours(
							parseInt(this.endHour),
							parseInt(this.endMinute),
							0
						);
						console.log('Actual End After: ', actualEnd);

						this.employeeService
							.checkOutAssignment({
								'geoTag': {
									'coordinates': {
										'lat': this.position.coords.latitude,
										'lon': this.position.coords.longitude
									},
									'description': this.address.results[0].formatted_address
								},
								_id: this._id,
								actualStart: actualStart,
								actualEnd: actualEnd,
								remark: this.remarks,
							})
							.subscribe(
								(response) => {
									console.log(response);
									this.showSuccess();
								},
								(error) => {
									if (error.status === 200) {
										this.showSuccess();
									} else {
										console.log(error);
										this.showError(error.error);
									}
								}
							);
					},
					(error) => {
						console.log(error);
					}
				);
			}
		}
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
