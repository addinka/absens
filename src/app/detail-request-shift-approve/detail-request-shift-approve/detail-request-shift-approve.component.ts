import { Component, OnInit } from '@angular/core';
import { HealthSafetyManagerService } from '../../core/services/health-safety-manager.service';
import { EmployeeService } from '../../core/services/employee.service';
import { ManagerService } from '../../core/services/manager.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-detail-request-shift-approve',
	templateUrl: './detail-request-shift-approve.component.html',
	styleUrls: ['./detail-request-shift-approve.component.scss'],
})
export class DetailRequestShiftApproveComponent implements OnInit {
	type;
	hrefId;
	isValidId = false;

	status = '';
	requestDate: Date;
	displayDate: string;
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

	constructor(
		public router: Router,
		protected healthService: HealthSafetyManagerService,
		protected employeeService: EmployeeService,
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

			this.getShiftDetail(this.hrefId);
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

	getShiftDetail(id) {
		this.managerService.getShiftRequestDetailById(id).subscribe(
			(response) => {
				this.isValidId = true;

				this.status = response.status;
				this.requestDate = new Date(response.requestDate);
				this.displayDate = this.utilsService.getDateTimeFormat(
					this.requestDate
				);

				this.requesterName = response.requesterDetails[0].name;
				this.requesterShiftName =
					response.originShiftDetails[0].namashift;
				const adjustedRequestDate = new Date(
					response.originShiftDetails[0].shiftStart
				);

				this.requesterShiftDate = this.utilsService.getDateTimeFormat(
					new Date(adjustedRequestDate)
				);

				if (response.targetShiftID !== "") {
					this.substituteName = response.targetShiftDetails[0].nama;
					this.substituteShiftName =
						response.targetShiftDetails[0].namashift;
					const adjustedSubstituteDate = new Date(
						response.targetShiftDetails[0].shiftStart
					);

					this.substituteShiftDate = this.utilsService.getDateTimeFormat(
						new Date(adjustedSubstituteDate)
					);
				}

				this.status = response.status;

				if (
					response.approverOneDetails.length !== 0 &&
					response.approverOneDetails !== undefined &&
					response.approverOneDetails !== null
				) {
					this.approverOneName = response.approverOneDetails[0].name;
					this.approverOneStatus = response.approverOneStatus;
				}

				if (
					response.approverTwoDetails.length !== 0 &&
					response.approverTwoDetails !== undefined &&
					response.approverTwoDetails !== null
				) {
					this.approverTwoName = response.approverTwoDetails[0].name;
					this.approverTwoStatus = response.approverTwoStatus;
				}

				this.remarks = response.remark;
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
		this.getShiftDetail(this.hrefId);

		if (this.isValidId) {
			const param = [];
			param.push({ _id: this.hrefId });
			this.managerService.approveShiftRequestDetailById(param).subscribe(
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
					this.router
						.navigate(['/dashboard'], {
							queryParams: {
								userType: localStorage.getItem('userType'),
							},
						})
						.then(() => {
							window.location.reload();
						});
				}
			);
		} else {
			this.showError('Id is invalid or no longer exists');
		}
	}

	rejectRequest() {
		this.getShiftDetail(this.hrefId);

		if (this.rejection === '') {
			this.showError('Please input rejection reason');

			return;
		}

		if (this.isValidId) {
			const param = [];
			param.push({ _id: this.hrefId, reason: this.rejection });
			this.managerService.rejectShiftRequestDetailById(param).subscribe(
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

	acceptIncomingRequest() {

		if (this.isValidId) {
			this.employeeService.acceptShift({
				'_id': this.hrefId
				}).subscribe(
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
					this.router
						.navigate(['/dashboard'], {
							queryParams: {
								userType: localStorage.getItem('userType'),
							},
						})
						.then(() => {
							window.location.reload();
						});
				}
			);
		} else {
			this.showError('Id is invalid or no longer exists');
		}
	}

	rejectIncomingRequest() {

		if (this.isValidId) {
			this.employeeService.rejectShift({
				'_id': this.hrefId
				}).subscribe(
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

	cancelShift() {
		if (this.isValidId) {
			const param = [];
			param.push({ _id: this.hrefId });
			this.managerService.cancelShift(param).subscribe(
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
				}
			);
		}
	}

	approveAssignShift() {
		this.employeeService.approveEmployeeShift({
			'_id': this.hrefId
			}).subscribe(
			response => {
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
			error => {
				this.router
						.navigate(['/dashboard'], {
							queryParams: {
								userType: localStorage.getItem('userType'),
							},
						})
						.then(() => {
							window.location.reload();
						});
			});
	}

	rejectAssignShift() {
		this.employeeService.rejectEmployeeShift({
			'_id': this.hrefId
			}).subscribe(
			response => {
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
			error => {
					console.log(error);
			});
	}
}
