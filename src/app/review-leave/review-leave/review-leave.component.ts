import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';
import { ManagerService } from '../../core/services/manager.service';
import { EmployeeService } from '../../core/services/employee.service';
import { UtilsService } from '../../core/services/utils.service';
import {
	FormGroup,
	FormBuilder,
	FormControl
} from '@angular/forms';

@Component({
	selector: 'app-review-leave',
	templateUrl: './review-leave.component.html',
	styleUrls: ['./review-leave.component.scss']
})
export class ReviewLeaveComponent extends BaseModal {
	requestType: any;
	modalId: string;
	type: string;

	status = '';
	approverOneName = 'First Approver';
	approverOneStatus = 'Status';

	requestDate: Date;
	displayDate;

	requesterName = '';

	leaveDate;

	duration = '';
	purpose = '';
	rejection = '';
	has = true;

	constructor(
		protected injector: Injector,
		protected employeeService: EmployeeService,
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
		this.managerService.getLeaveRequestDetailById(this.modalId)
		.subscribe(
			response => {
				this.status = response.status;

				if (response.approverDetails.length !== 0 && response.approverDetails !== undefined && response.approverDetails !== null) {
					this.approverOneName = response.approverDetails[0].name;
					this.approverOneStatus = response.status;
				}

				this.requestDate = new Date(response.requestDate);
				this.displayDate = this.utilsService.getDateTimeFormat(this.requestDate);

				this.requesterName = response.requesterDetails[0].name;
				// tslint:disable-next-line: max-line-length
				this.leaveDate = this.utilsService.getDateFormat(new Date(response.startDate)) + ' - ' + this.utilsService.getDateFormat(new Date(response.endDate));

				this.duration = response.duration;
				this.purpose = response.reason;
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
		console.log(this.modalId);
	}

	approveRequest() {
		const param = [];
		param.push({_id: this.modalId });
		this.managerService.approveLeaveRequestDetailById(param)
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

	rejectRequest() {
		const param = [];
		param.push({_id: this.modalId, reason: this.rejection});
		this.managerService.rejectLeaveRequestDetailById(param)
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

	cancelLeave() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;

		this.managerService.cancelLeave({
			'_id': this.modalId
			}).subscribe(
			response => {
					console.log(response);
					location.reload();
			},
			error => {
					console.log(error);
					location.reload();
			});
	}

	closeModal() {
		this.modalService.destroy();
		this.type = '';
		console.log('modal type close', this.type);
	}
}
