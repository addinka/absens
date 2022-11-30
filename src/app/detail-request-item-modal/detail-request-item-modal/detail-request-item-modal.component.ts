import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';
import { EmployeeService } from '../../core/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-detail-request-item-modal',
	templateUrl: './detail-request-item-modal.component.html',
	styleUrls: ['./detail-request-item-modal.component.scss']
})

export class DetailRequestItemModalComponent extends BaseModal implements OnInit {

		_id: string;
		modalText: string;
		letterPressed = false;

		status: string;
		requestDate: any;
		name: string;
		point: string;
		time: any;
		reviewDate: any;
		itemType: string;
		reason: string;
		isActive: string;
		quantity: any;
		remarks: string;
		reasonText: string;

		constructor(
				protected injector: Injector,
				public modalService: ModalService,
				public employeeService: EmployeeService,
				public toastr: ToastrService,
				public utilsService: UtilsService,
		) {
				super();
				this.modalText = 'lol';
				this._id = this.injector.get('_id');
		}

		ngOnInit () {
				this.getRequestDetail(this._id);
		}

		showSuccess() {
		this.toastr.success('Hello world!', 'Toastr fun!');
	}

	showError(errorMessage) {
				if (errorMessage === '' || errorMessage === null || errorMessage === undefined) {
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

		getRequestDetail (id) {
			this.employeeService.getItemRequestDetail(id).subscribe(
					response => {
							console.log(response);
							this.status = response.status.toLowerCase();
							if(this.status === 'rejected'){
								this.reasonText = 'Rejection';
							}else if(this.status === 'revoked'){
								this.reasonText = 'Revocation';
							}else{
								this.reasonText = 'Approval';
							}
							this.requestDate = this.utilsService.getDateTimeFormat(new Date(response.requestDate));
							this.name = response.requesterDetails[0].name;
							this.isActive = response.isActive;
							this.itemType = response.itemType;
							this.point = response.pickupPoint;
							this.time = this.utilsService.getDateTimeFormat(new Date(response.pickupTime));
							this.quantity = response.quantity;
							this.remarks = response.remarks;
							if (response.status !== 'REQUESTED') {
									this.reviewDate = this.utilsService.getDateTimeFormat(new Date(response.timestamp));
							} else {
									this.reviewDate = null; // Haven't been reviewed
							}
							this.reason = response.reason;
					},
					error => {
							console.log(error);
							this.showError(error.error);
					});
		}

		sureCancel () {
			const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
			buttonSubmitElement.disabled = true;

			this.employeeService.cancelItem({
					'_id': this._id
					}).subscribe(
					response => {
							console.log(response);
							location.reload();
					},
					error => {
							console.log(error);
							this.showError(error.error);
					});
		}
}
