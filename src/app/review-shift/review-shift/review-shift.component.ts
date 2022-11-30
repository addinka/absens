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
	selector: 'app-review-shift',
	templateUrl: './review-shift.component.html',
	styleUrls: ['./review-shift.component.scss']
})
export class ReviewShiftComponent extends BaseModal {
	requestType: any;
	modalId: string;
	type: string;

	requestDate: Date;
	displayDate;
	status = '';
	approverOneName = 'First Approver';
	approverTwoName = 'Second Approver';
	approverOneStatus = 'Status';
	approverTwoStatus = 'Status';

	requesterName = '';
	requesterShiftName = '';
	requesterShiftDate = '';

	substituteName = '';
	substituteShiftName = '';
	substituteShiftDate = '';

	remarks = '';
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
		this.managerService.getShiftRequestDetailById(this.modalId)
		.subscribe(
			response => {
				this.requestDate = new Date(response.requestDate);

				this.displayDate = this.utilsService.getDateTimeFormat(this.requestDate);

				this.requesterName = response.requesterDetails[0].name;
				this.requesterShiftName = response.originShiftDetails[0].namashift;
				const adjustedRequestDate = new Date(response.originShiftDetails[0].shiftStart);
				this.requesterShiftDate = this.utilsService.getDateTimeFormat(new Date(adjustedRequestDate));

				if (response.targetShiftID !== "") {
					this.substituteName = response.targetShiftDetails[0].nama;
					this.substituteShiftName = response.targetShiftDetails[0].namashift;
					const adjustedSubstituteDate = new Date(response.targetShiftDetails[0].shiftStart);
					this.substituteShiftDate = this.utilsService.getDateTimeFormat(new Date(adjustedSubstituteDate));
				}

				this.status = response.status;

				if (response.approverOneDetails.length !== 0 && response.approverOneDetails !== undefined && response.approverOneDetails !== null) {
					this.approverOneName = response.approverOneDetails[0].name;
					this.approverOneStatus = response.approverOneStatus;
				}

				if (response.approverTwoDetails.length !== 0 && response.approverTwoDetails !== undefined && response.approverTwoDetails !== null) {
					this.approverTwoName = response.approverTwoDetails[0].name;
					this.approverTwoStatus = response.approverTwoStatus;
				}

				this.remarks = response.remark;
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
		this.managerService.approveShiftRequestDetailById(param)
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
		this.managerService.rejectShiftRequestDetailById(param)
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

	cancelShift() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;

		this.managerService.cancelShift({
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

	acceptShift() {
		this.employeeService.acceptShift({
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

	rejectShift() {
		this.employeeService.rejectShift({
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

	approveAssignShift() {
		this.employeeService.approveEmployeeShift({
			'_id': this.modalId
			}).subscribe(
			response => {
					console.log(response);
					location.reload();
			},
			error => {
					location.reload();
					console.log(error);
			});
	}

	rejectAssignShift() {
		this.employeeService.rejectEmployeeShift({
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


	closeModal() {
		this.modalService.destroy();
		this.type = '';
		console.log('modal type close', this.type);
	}
}
