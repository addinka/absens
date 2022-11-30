import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../core/services/manager.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-detail-request-overtime',
	templateUrl: './detail-request-overtime.component.html',
	styleUrls: ['./detail-request-overtime.component.scss'],
})
export class DetailRequestOvertimeComponent implements OnInit {
	hrefId;
	type;
	letterPressed = false;
	isValidId = false;

	status: string;
	requestDate: Date;
	displayDate: string;
	overtimeDate: string;
	requesterName = '';
	startTime = '';
	endTime = '';
	totalOTHour;
	totalOTHourWeekend = '';
	otHour = 0;
	otMinutes = 0;
	weekendOTHour = 0;
	weekendOTMinutes = 0;
	overtimeCategory = '';
	remarks = '';
	location = '';
	reason = '';
	approverOneName = 'First Approver';
	approverTwoName = 'Second Approver';
	approverOneStatus = 'Status';
	approverTwoStatus = 'Status';

	constructor(
		public router: Router,
		public managerService: ManagerService,
		public toastr: ToastrService,
		public activatedRoute: ActivatedRoute,
		public utilsService: UtilsService
	) {}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			console.log(params);
			this.hrefId = params.id;
			this.type = params.type;

			if (this.type === 'overtime') {
				this.getRequestDetail(this.hrefId);
			} else {
				this.getAssignmentDetail(this.hrefId);
			}
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

	getRequestDetail(id) {
		this.managerService.getOvertimeDetailById(id).subscribe(
			(response) => {
				this.isValidId = true;
				console.log(response);
				this.status = response.status.toLowerCase();

				if (response.approverOneDetails.length !== 0 && response.approverOneDetails !== undefined && response.approverOneDetails !== null) {
					this.approverOneName = response.approverOneDetails[0].name;
					this.approverOneStatus = response.approverOneStatus;
				}

				if (response.approverTwoDetails.length !== 0 && response.approverTwoDetails !== undefined && response.approverTwoDetails !== null) {
					this.approverTwoName = response.approverTwoDetails[0].name;
					this.approverTwoStatus = response.approverTwoStatus;
				}

				let startDate = new Date(response.plannedStart);

				let hours;
				let minutes;

				hours = startDate.getHours();
				minutes = startDate.getMinutes();

				if (hours === 0) {
					hours = '00';
				}

				if (minutes === 0) {
					minutes = '00';
				}

				if (hours.toString().length === 1) {
					hours = '0' + hours;
				}

				if (minutes.toString().length === 1) {
					minutes = '0' + minutes;
				}

				let startTime = hours + ':' + minutes;

				let overtimeDate = startDate.toLocaleDateString();

				let endDate = new Date(response.plannedEnd);
				let endHours;

				endHours = endDate.getHours();
				let endMinutes;

				endMinutes = endDate.getMinutes();

				if (endHours === 0) {
					endHours = '00';
				}

				if (endHours.toString().length === 1) {
					endHours = '0' + endHours;
				}

				if (endMinutes === 0) {
					endMinutes = '00';
				}

				if (endMinutes.toString().length === 1) {
					endMinutes = '0' + endMinutes;
				}

				let endTime = endHours + ':' + endMinutes;

				if (this.status === 'FINISHED') {
					startDate = new Date(response.actualStart);
					hours = startDate.getHours();

					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;
					overtimeDate = startDate.toLocaleDateString();

					endDate = new Date(response.actualEnd);
					endHours = endDate.getHours();

					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;
				}

				this.requestDate = new Date(response.requestDate);
				this.displayDate = this.utilsService.getDateTimeFormat(
					this.requestDate
				);
				this.overtimeDate = overtimeDate;
				this.requesterName = response.requesterDetails[0].name;
				this.startTime = startTime;
				this.endTime = endTime;
				this.totalOTHour = response.weekdayCount + response.weekendCount;

				this.otHour = Math.floor(this.totalOTHour / 60);
				this.otMinutes = this.totalOTHour % 60;

				this.totalOTHour =
					this.otHour + ' Hours ' + this.otMinutes + ' Minutes';

				this.weekendOTHour = Math.floor(response.weekendCount / 60);
				this.weekendOTMinutes = response.weekendCount % 60;

				this.totalOTHourWeekend =
					this.weekendOTHour +
					' Hours ' +
					this.weekendOTHour +
					' Minutes';

				this.reason = response.reason;
				this.remarks = response.remark;
				this.location = response.geoTag.description;
				this.overtimeCategory = response.overtimeCategory;
			},
			(error) => {
				this.isValidId = false;
				console.log(error);
				this.showError(error.error);
			}
		);
	}

	getAssignmentDetail(id) {
		this.managerService.getAssignmentDetailById(id).subscribe(
			(response) => {
				this.isValidId = true;
				console.log(response);
				this.status = response.status.toLowerCase();

				let startDate = new Date(response.plannedStart);
				let hours;
				hours = startDate.getHours();
				let minutes;

				minutes = startDate.getMinutes();

				if (hours === 0) {
					hours = '00';
				}

				if (minutes === 0) {
					minutes = '00';
				}

				if (hours.toString().length === 1) {
					hours = '0' + hours;
				}

				if (minutes.toString().length === 1) {
					minutes = '0' + minutes;
				}

				let startTime = hours + ':' + minutes;

				let overtimeDate = startDate.toLocaleDateString();

				let endDate = new Date(response.plannedEnd);
				let endHours;
				endHours = endDate.getHours();
				let endMinutes;

				endMinutes = endDate.getMinutes();

				if (endHours === 0) {
					endHours = '00';
				}

				if (endHours.toString().length === 1) {
					endHours = '0' + endHours;
				}

				if (endMinutes === 0) {
					endMinutes = '00';
				}

				if (endMinutes.toString().length === 1) {
					endMinutes = '0' + endMinutes;
				}

				let endTime = endHours + ':' + endMinutes;

				if (this.status === 'FINISHED') {
					startDate = new Date(response.actualStart);
					hours = startDate.getHours();

					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;
					overtimeDate = startDate.toLocaleDateString();

					endDate = new Date(response.actualEnd);
					endHours = endDate.getHours();

					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;
				}

				this.requestDate = new Date(response.requestDate);
				this.displayDate = this.utilsService.getDateTimeFormat(
					this.requestDate
				);
				this.overtimeDate = overtimeDate;
				this.requesterName = response.requesterDetails[0].name;
				this.startTime = startTime;
				this.endTime = endTime;
				this.totalOTHour = response.weekdayCount;

				this.otHour = Math.floor(response.weekdayCount / 60);
				this.otMinutes = response.weekdayCount % 60;

				this.totalOTHour =
					this.otHour + ' Hours ' + this.otMinutes + ' Minutes';

				this.weekendOTHour = Math.floor(response.weekendCount / 60);
				this.weekendOTMinutes = response.weekendCount % 60;

				this.totalOTHourWeekend =
					this.weekendOTHour +
					' Hours ' +
					this.weekendOTHour +
					' Minutes';

				this.reason = response.reason;
				this.remarks = response.remark;
				this.location = response.geoTag.description;
			},
			(error) => {
				this.isValidId = false;
				console.log(error);
				this.showError(error.error);
			}
		);
	}

	sureCancel() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;
		
		if (this.type === 'overtime') {
			this.managerService
				.cancelOvertime({
					_id: this.hrefId,
				})
				.subscribe(
					(response) => {
						console.log(response);
						this.router.navigate(['/dashboard']).then(() => {
							window.location.reload();
						});
					},
					(error) => {
						console.log(error);
						this.showError(error.error);
					}
				);
		} else {
			this.managerService
				.cancelAssignment({
					_id: this.hrefId,
				})
				.subscribe(
					(response) => {
						console.log(response);
						this.router.navigate(['/dashboard']).then(() => {
							window.location.reload();
						});
					},
					(error) => {
						console.log(error);
						this.showError(error.error);
					}
				);
		}
	}
}
