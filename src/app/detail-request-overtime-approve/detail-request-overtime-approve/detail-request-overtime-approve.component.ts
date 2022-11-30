import { Component, OnInit } from '@angular/core';
import { HealthSafetyManagerService } from '../../core/services/health-safety-manager.service';
import { ManagerService } from '../../core/services/manager.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-detail-request-overtime-approve',
	templateUrl: './detail-request-overtime-approve.component.html',
	styleUrls: ['./detail-request-overtime-approve.component.scss'],
})
export class DetailRequestOvertimeApproveComponent implements OnInit {
	type;
	hrefId;
	isValidId = false;

	requestDate: Date;
	displayDate: string;
	overtimeDate: string;
	requesterName = '';
	approverOneName = 'First Approver';
	approverTwoName = 'Second Approver';
	approverOneStatus = 'Status';
	approverTwoStatus = 'Status';
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
	rejection = '';

	constructor(
		public router: Router,
		protected healthService: HealthSafetyManagerService,
		protected managerService: ManagerService,
		public activatedRoute: ActivatedRoute,
		public toastr: ToastrService,
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
				const startDate = new Date(response.plannedStart);



				let hours;
				hours = startDate.getHours();

				let minutes;

				minutes = startDate.getMinutes();

				if (hours === 0) {
					hours = '00';
				}

				if (hours.toString().length === 1) {
					hours = '0' + hours;
				}

				if (minutes === 0) {
					minutes = '00';
				}

				if (minutes.toString().length === 1) {
					minutes = '0' + minutes;
				}

				const startTime = hours + ':' + minutes;
				const overtimeDate = startDate.toLocaleDateString();

				const endDate = new Date(response.plannedEnd);

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

				const endTime = endHours + ':' + endMinutes;

				this.requestDate = new Date(response.requestDate);
				this.displayDate = this.utilsService.getDateTimeFormat(
					this.requestDate
				);
				this.overtimeDate = overtimeDate;
				this.requesterName = response.requesterDetails[0].name;
				this.approverOneName = response.approverOneDetails[0].name;
				this.approverTwoName = response.approverTwoDetails[0].name;
				this.approverOneStatus = response.approverOneStatus;
				this.approverTwoStatus = response.approverTwoStatus;
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

				this.remarks = response.remark;
				this.location = response.geoTag.description;
				this.overtimeCategory = response.overtimeCategory;
				console.log(response);
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
				const startDate = new Date(response.plannedStart);
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

				const startTime = hours + ':' + minutes;
				const overtimeDate = startDate.toLocaleDateString();

				const endDate = new Date(response.plannedEnd);
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

				const endTime = endHours + ':' + endMinutes;

				this.requestDate = new Date(response.requestDate);
				this.displayDate = this.utilsService.getDateTimeFormat(
					this.requestDate
				);
				this.overtimeDate = overtimeDate;
				this.requesterName = response.requesterDetails[0].name;

				if (response.approverOneDetails.length !== 0 && response.approverOneDetails !== undefined && response.approverOneDetails !== null) {
					this.approverOneName = response.approverOneDetails[0].name;
					this.approverOneStatus = response.approverOneStatus;
				}

				if (response.approverTwoDetails.length !== 0 && response.approverTwoDetails !== undefined && response.approverTwoDetails !== null) {
					this.approverTwoName = response.approverTwoDetails[0].name;
					this.approverTwoStatus = response.approverTwoStatus;
				}

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

				this.remarks = response.remark;
				this.location = response.geoTag.description;

				console.log(response);
			},
			(error) => {
				this.isValidId = false;
				console.log(error);
				this.showError(error.error);
			}
		);
	}

	approveRequest() {
		if (this.type === 'overtime') {
			this.getRequestDetail(this.hrefId);
		} else {
			this.getAssignmentDetail(this.hrefId);
		}

		if (this.isValidId && this.type === 'overtime') {
			const param = [];
			param.push({ _id: this.hrefId });
			this.managerService
				.approveOvertimeRequestDetailById(param)
				.subscribe(
					(response) => {
						console.log(response);
						this.router
							.navigate(['/dashboard'], {
								queryParams: {
									userType: localStorage.getItem('userType'),
								},
							})
							.then(() => {
								window.location.reload();
							});
					},
					(error) => {
						console.log(error);
						this.showError(error.error);
					}
				);
		} else if (this.isValidId && this.type === 'work') {
			const param = [];
			param.push({ _id: this.hrefId });
			this.managerService
				.approveAssignmentRequestDetailById(param)
				.subscribe(
					(response) => {
						console.log(response);
						this.router
							.navigate(['/dashboard'], {
								queryParams: {
									userType: localStorage.getItem('userType'),
								},
							})
							.then(() => {
								window.location.reload();
							});
					},
					(error) => {
						console.log(error);
						this.showError(error.error);
					}
				);
		}  else {
			this.showError('Id is invalid or no longer exists');
		}
	}

	rejectRequest() {
		if (this.type === 'overtime') {
			this.getRequestDetail(this.hrefId);
		} else {
			this.getAssignmentDetail(this.hrefId);
		}

		if (this.rejection === '') {
			this.showError('Please input rejection reason');

			return;
		}

		if (this.isValidId && this.type === 'overtime') {
			const param = [];
			param.push({ _id: this.hrefId, reason: this.rejection });
			this.managerService
				.rejectOvertimeRequestDetailById(param)
				.subscribe(
					(response) => {
						console.log(response);
						this.router
							.navigate(['/dashboard'], {
								queryParams: {
									userType: localStorage.getItem('userType'),
								},
							})
							.then(() => {
								window.location.reload();
							});
					},
					(error) => {
						console.log(error);
						this.showError(error.error);
					}
				);
		} else if (this.isValidId && this.type === 'work') {
			const param = [];
			param.push({ _id: this.hrefId, reason: this.rejection });
			this.managerService
				.rejectAssignmentRequestDetailById(param)
				.subscribe(
					(response) => {
						console.log(response);
						this.router
							.navigate(['/dashboard'], {
								queryParams: {
									userType: localStorage.getItem('userType'),
								},
							})
							.then(() => {
								window.location.reload();
							});
					},
					(error) => {
						console.log(error);
						this.showError(error.error);
					}
				);
		} else {
			this.showError('Id is invalid or no longer exists');
		}
	}
}
