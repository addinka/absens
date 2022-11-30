import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { ManagerService } from '../../core/services/manager.service';
import { HealthSafetyManagerService } from '../../core/services/health-safety-manager.service';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'app-multiple-reject',
	templateUrl: './multiple-reject.component.html',
	styleUrls: ['./multiple-reject.component.scss']
})
export class MultipleRejectComponent extends BaseModal implements OnInit {
	passedArray = [];
	passedArrayOvertime = [];
	passedArrayAssignment = [];
	passedArrayShift = [];
	passedArrayLeave = [];
	userType = '';
	setStatus: string;
	textbox: string;
	reason = '';
	button: string;
	constructor(protected injector: Injector,
		public toastr: ToastrService,
		protected managerService: ManagerService,
		protected healthService: HealthSafetyManagerService) {
		super();
		this.passedArray = this.injector.get('passedArray');
		this.passedArrayOvertime = this.injector.get('passedArrayOvertime');
		this.passedArrayAssignment = this.injector.get('passedArrayAssignment');
		this.passedArrayShift = this.injector.get('passedArrayShift');
		this.passedArrayLeave = this.injector.get('passedArrayLeave');
		this.setStatus = this.injector.get('setStatus');
	}
	ngOnInit() {
		if (this.setStatus === 'Reject') {
			this.textbox = 'rejection';
			this.button = 'Reject';
		} else if (this.setStatus === 'Revoke') {
			this.textbox = 'revocation';
			this.button = 'Revoke';
		} else {
			this.textbox = 'approval';
			this.button = 'Approve';
		}
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

	rejectRequest() {
		this.userType = localStorage.getItem('userType');
		if (this.userType === 'sc' || this.userType === 'manager') {
			if (this.reason === '' && this.setStatus !== "Approve") {
				this.showError('Please fill the reason field');
				return;
			} else {
				this.managerAndScRejection();
			}
		} else if (this.userType === 'hsc') {
			if (this.reason === '' && this.setStatus !== "Approve") {
				this.showError('Please fill the reason field');
				return;
			} else {
				this.hscRejection();
			}
		}
	}

	managerAndScRejection() {
		const param = [];
		const overtimeParam = [];
		const assignmentParam = [];
		const shiftParam = [];
		const leaveParam = [];

		for (let i = 0; i < this.passedArray.length; i++) {
			param.push({ _id: this.passedArray[i], reason: this.reason });
		}

		if (this.setStatus === 'Reject') {
			this.managerService.rejectRequestDetailById(param)
				.subscribe(
					response => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					},
					error => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					});
		} else if (this.setStatus === 'Revoke') {
			this.managerService.revokeRequestDetailById(param)
				.subscribe(
					response => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					},
					error => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					});
		} else {
			this.managerService.approveRequestDetailById(param)
			.subscribe(
				response => {
					this.managerService.managerEmitter().emit();
					this.closeModal();
				},
				error => {
					this.managerService.managerEmitter().emit();
					this.closeModal();
				});
		}

		if (this.userType === 'manager') {
			for (let j = 0; j < this.passedArrayOvertime.length; j++) {
				overtimeParam.push({_id: this.passedArrayOvertime[j]});
			}

			if (this.setStatus === 'Reject') {
				this.managerService.rejectOvertimeRequestDetailById(overtimeParam)
				.subscribe(
					response => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					},
					error => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					});
			} else if (this.setStatus === 'Approve') {
				this.managerService.approveOvertimeRequestDetailById(overtimeParam)
				.subscribe(
					response => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					},
					error => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					});
			}

			for (let j = 0; j < this.passedArrayAssignment.length; j++) {
				assignmentParam.push({_id: this.passedArrayAssignment[j]});
			}

			if (this.setStatus === 'Reject') {
				this.managerService.rejectAssignmentRequestDetailById(assignmentParam)
				.subscribe(
					response => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					},
					error => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					});
			} else if (this.setStatus === 'Approve') {
				this.managerService.approveAssignmentRequestDetailById(assignmentParam)
					.subscribe(
						response => {
							this.managerService.managerEmitter().emit();
							this.closeModal();
						},
						error => {
							this.managerService.managerEmitter().emit();
							this.closeModal();
						});
			}

			for (let j = 0; j < this.passedArrayShift.length; j++) {
				shiftParam.push({_id: this.passedArrayShift[j]});
			}

			if (this.setStatus === 'Reject') {
				this.managerService.rejectShiftRequestDetailById(shiftParam)
				.subscribe(
					response => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					},
					error => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					});
			} else if (this.setStatus === 'Approve') {
				this.managerService.approveShiftRequestDetailById(shiftParam)
					.subscribe(
						response => {
							this.managerService.managerEmitter().emit();
							this.closeModal();
						},
						error => {
							this.managerService.managerEmitter().emit();
							this.closeModal();
						});
			}

			for (let j = 0; j < this.passedArrayLeave.length; j++) {
				shiftParam.push({_id: this.passedArrayLeave[j]});
			}

			if (this.setStatus === 'Reject') {
				this.managerService.rejectLeaveRequestDetailById(shiftParam)
				.subscribe(
					response => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					},
					error => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					});
			} else if (this.setStatus === 'Approve') {
				this.managerService.approveLeaveRequestDetailById(shiftParam)
					.subscribe(
						response => {
							this.managerService.managerEmitter().emit();
							this.closeModal();
						},
						error => {
							this.managerService.managerEmitter().emit();
							this.closeModal();
						});
			}
		}
	}

	hscRejection() {
		const param = [];
		for (let i = 0; i < this.passedArray.length; i++) {
			param.push({ _id: this.passedArray[i], reason: this.reason });
		}
		if(this.setStatus === 'Reject'){
			this.healthService.rejectItemRequestDetailById(param)
			.subscribe(
				response => {
					this.managerService.managerEmitter().emit();
					this.closeModal();
				},
				error => {
					this.managerService.managerEmitter().emit();
					this.closeModal();
				});
		} else if(this.setStatus === 'Revoke') {
			this.healthService.revokeRequestItemDetailById(param)
				.subscribe(
					response => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					},
					error => {
						this.managerService.managerEmitter().emit();
						this.closeModal();
					});
		} else {
			this.healthService.approveItemRequestDetailById(param)
			.subscribe(
				response => {
					this.managerService.managerEmitter().emit();
					this.closeModal();
				},
				error => {
					this.managerService.managerEmitter().emit();
					this.closeModal();
				});
		}
	}
}
