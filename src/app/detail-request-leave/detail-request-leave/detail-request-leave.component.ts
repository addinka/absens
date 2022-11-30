import { Component, OnInit, Injector } from '@angular/core';
import { ModalService } from 'carbon-components-angular';
import { ManagerService } from '../../core/services/manager.service';
import { UtilsService } from '../../core/services/utils.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


interface Post {
	date: Date;
}

@Component({
	selector: 'app-detail-request-leave',
	templateUrl: './detail-request-leave.component.html',
	styleUrls: ['./detail-request-leave.component.scss']
})
export class DetailRequestLeaveComponent implements OnInit {
	modalType: any;
	type: any;
	hrefId;
	isValidId = false;

	requestType: any;

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
		public router: Router,
		protected managerService: ManagerService,
		public activatedRoute: ActivatedRoute,
		public toastr: ToastrService,
		public utilsService: UtilsService,
		public modalService: ModalService
	) {
	}

	// tslint:disable-next-line:use-lifecycle-interface
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params: Params) => {
					console.log(params);
					this.hrefId = params.id;
					this.type = params.type;
		});

		this.managerService.getLeaveRequestDetailById(this.hrefId)
		.subscribe(
			response => {
				this.isValidId = true;
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
				this.isValidId = false;
			}
		);
		console.log(this.hrefId);
	}

	showSuccess(successMessage) {
		this.toastr.success(successMessage);
	}

	showError(errorMessage) {
		if (errorMessage === '' || errorMessage === null || errorMessage === undefined) {
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	approveRequest() {
		const param = [];
		param.push({_id: this.hrefId });
		this.managerService.approveLeaveRequestDetailById(param)
		.subscribe(
			response => {
				console.log(response);
				this.managerService.managerEmitter().emit();
					this.showSuccess('Succesfully approved leave request');
					this.backToDashboard();
			},
			error => {
				console.log(error);
				this.managerService.managerEmitter().emit();
				this.showError('Failed to approve request, please try again');
				this.backToDashboard();
			});
	}

	rejectRequest() {
		const param = [];
		param.push({_id: this.hrefId, reason: this.rejection});
		this.managerService.rejectLeaveRequestDetailById(param)
		.subscribe(
			response => {
				console.log(response);
					this.managerService.managerEmitter().emit();
					this.showSuccess('Succesfully rejected leave request');
					this.backToDashboard();
			},
			error => {
				console.log(error);
				this.managerService.managerEmitter().emit();
				this.showError('Failed to reject request, please try again');
				this.backToDashboard();
			});
	}

	cancelLeave() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;

		this.managerService.cancelLeave({
			'_id': this.hrefId
			}).subscribe(
			response => {
					console.log(response);
					this.showSuccess('Succesfully canceled request');
					this.backToDashboard();
			},
			error => {
					console.log(error);
				this.showError('Failed to cancel request, please try again');
				this.backToDashboard();
			});
	}

	backToDashboard() {
		this.router.navigate(['/dashboard']);
	}

	closeModal() {
		this.modalService.destroy();
		this.modalType = '';
		console.log('modal type close', this.modalType);
	}
}
