import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';
import { ManagerService } from '../../core/services/manager.service';
import { UtilsService } from '../../core/services/utils.service';
import {
	FormGroup,
	FormBuilder,
	FormControl
} from '@angular/forms';

@Component({
	selector: 'app-review-overtime',
	templateUrl: './review-overtime.component.html',
	styleUrls: ['./review-overtime.component.scss']
})



export class ReviewOvertimeComponent extends BaseModal {
	requestType: any;
	modalId: string;
	type: string;

	requestDate: Date;
	overtimeDate: string;
	displayDate: string;
	status = '';
	approverOneName = 'First Approver';
	approverTwoName = 'Second Approver';
	approverOneStatus = 'Status';
	approverTwoStatus = 'Status';
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
	rejection = '';
	has = true;

	constructor(
		protected injector: Injector, 
		protected managerService: ManagerService, 
		public utilsService: UtilsService, 
		private modalService: ModalService
	) {
		super();
		this.requestType = this.injector.get('requestType');
		this.modalId = this.injector.get('modalText');
		this.type = this.injector.get('type');
	}
	// tslint:disable-next-line:use-lifecycle-interface
	ngOnInit() {
		console.log('Modal open', this.type);
		if (this.type === 'Overtime') {
			this.managerService.getOvertimeDetailById(this.modalId)
			.subscribe(
				response => {
					let startDate;
					let startTime;
					let endDate;
					let endTime;

					if (response.status === 'FINISHED') {
						startDate = new Date(response.actualStart);
						let hours;
						hours = startDate.getHours();
						let minutes = startDate.getMinutes();

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

						startTime = hours + ':' + minutes;

						endDate = new Date(response.actualEnd);
						endTime = endDate.toLocaleTimeString();

						let endHours = endDate.getHours();
						let endMinutes = endDate.getMinutes();

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
					} else {
						startDate = new Date(response.plannedStart);

						let hours;
						hours = startDate.getHours();
						let minutes = startDate.getMinutes();

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

						startTime = hours + ':' + minutes;

						endDate = new Date(response.plannedEnd);

						let endHours = endDate.getHours();
						let endMinutes = endDate.getMinutes();

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
					this.overtimeDate = this.utilsService.getDateFormat(startDate);
					this.displayDate = this.utilsService.getDateTimeFormat(this.requestDate);
					this.status = response.status;

					if (response.approverOneDetails.length !== 0 && response.approverOneDetails !== undefined && response.approverOneDetails !== null) {
						this.approverOneName = response.approverOneDetails[0].name;
						this.approverOneStatus = response.approverOneStatus;
					}

					if (response.approverTwoDetails.length !== 0 && response.approverTwoDetails !== undefined && response.approverTwoDetails !== null) {
						this.approverTwoName = response.approverTwoDetails[0].name;
						this.approverTwoStatus = response.approverTwoStatus;
					}

					this.requesterName = response.requesterDetails[0].name;
					this.startTime = startTime;
					this.endTime = endTime;
					this.totalOTHour = response.weekdayCount + response.weekendCount;

					this.otHour = Math.floor(this.totalOTHour / 60);
					this.otMinutes = this.totalOTHour % 60;

					this.totalOTHour = this.otHour + ' Hours ' + this.otMinutes + ' Minutes';

					this.weekendOTHour = Math.floor(response.weekendCount / 60);
					this.weekendOTMinutes = response.weekendCount % 60;

					this.totalOTHourWeekend = this.weekendOTHour + ' Hours ' + this.weekendOTHour + ' Minutes';
					this.remarks = response.remark;
					this.overtimeCategory = response.overtimeCategory;
					console.log(response);
				},
				error => {
					console.log(error);
				}
			);
		} else {
			this.managerService.getAssignmentDetailById(this.modalId)
			.subscribe(
				response => {
					let startDate;
					let startTime;
					let endDate;
					let endTime;

					if (response.status === 'FINISHED') {
						startDate = new Date(response.actualStart);
						let hours;
						hours = startDate.getHours();
						let minutes = startDate.getMinutes();

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

						startTime = hours + ':' + minutes;

						endDate = new Date(response.actualEnd);
						endTime = endDate.toLocaleTimeString();

						let endHours = endDate.getHours();
						let endMinutes = endDate.getMinutes();

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
					} else {
						startDate = new Date(response.plannedStart);

						let hours;
						hours = startDate.getHours();
						let minutes = startDate.getMinutes();

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

						startTime = hours + ':' + minutes;

						endDate = new Date(response.plannedEnd);

						let endHours = endDate.getHours();
						let endMinutes = endDate.getMinutes();

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
					this.overtimeDate = this.utilsService.getDateFormat(startDate);
					this.displayDate = this.utilsService.getDateTimeFormat(this.requestDate);
					this.status = response.status;
					this.approverOneName = response.approverOneDetails[0].name;
					this.approverTwoName = response.approverTwoDetails[0].name;
					this.approverOneStatus = response.approverOneStatus;
					this.approverTwoStatus = response.approverTwoStatus;
					this.requesterName = response.requesterDetails[0].name;
					this.startTime = startTime;
					this.endTime = endTime;
					this.totalOTHour = response.weekdayCount + response.weekendCount;

					this.otHour = Math.floor(this.totalOTHour / 60);
					this.otMinutes = this.totalOTHour % 60;

					this.totalOTHour = this.otHour + ' Hours ' + this.otMinutes + ' Minutes';

					this.weekendOTHour = Math.floor(response.weekendCount / 60);
					this.weekendOTMinutes = response.weekendCount % 60;

					this.totalOTHourWeekend = this.weekendOTHour + ' Hours ' + this.weekendOTHour + ' Minutes';
					this.remarks = response.remark;
					this.overtimeCategory = response.overtimeCategory;
					console.log(response);
				},
				error => {
					console.log(error);
				}
			);
		}

		console.log(this.modalId);
	}

	approveRequest() {
		const param = [];
		param.push({_id: this.modalId});

		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;

		if (this.type === 'Overtime') {
			this.managerService.approveOvertimeRequestDetailById(param)
			.subscribe(
				response => {
					console.log(response);
					this.managerService.managerEmitter().emit();
					this.closeModal();
				},
				error => {
					console.log(error);
					this.managerService.managerEmitter().emit();
					this.closeModal();
				});
		} else {
			this.managerService.approveAssignmentRequestDetailById(param)
			.subscribe(
				response => {
					console.log(response);
					this.managerService.managerEmitter().emit();
					this.closeModal();
				},
				error => {
					console.log(error);
					this.managerService.managerEmitter().emit();
					this.closeModal();
				});
		}
	}

	rejectRequest() {
		const param = [];
		param.push({_id: this.modalId, reason: this.rejection});

		const buttonRejectElement = (<HTMLInputElement>document.getElementById('buttonReject'));
		buttonRejectElement.disabled = true;

		if (this.type === 'Overtime') {
			this.managerService.rejectOvertimeRequestDetailById(param)
			.subscribe(
				response => {
					console.log(response);
					this.managerService.managerEmitter().emit();
					this.closeModal();
				},
				error => {
					console.log(error);
					this.managerService.managerEmitter().emit();
					this.closeModal();
				});
		} else {
			this.managerService.rejectAssignmentRequestDetailById(param)
			.subscribe(
				response => {
					console.log(response);
					this.managerService.managerEmitter().emit();
					this.closeModal();
				},
				error => {
					console.log(error);
					this.managerService.managerEmitter().emit();
					this.closeModal();
				});
		}
	}

	cancelOvertime() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;

		if (this.type === 'Overtime') {
			this.managerService.cancelOvertime({
				'_id': this.modalId
				}).subscribe(
				response => {
						console.log(response);
						location.reload();
				},
				error => {
						console.log(error);
				});
		} else {
			this.managerService.cancelAssignment({
				'_id': this.modalId
				}).subscribe(
				response => {
						console.log(response);
						location.reload();
				},
				error => {
						console.log(error);
				});
		}
	}

	closeModal() {
		this.modalService.destroy();
		this.type='';
		console.log('modal type close', this.type);
	}
}
