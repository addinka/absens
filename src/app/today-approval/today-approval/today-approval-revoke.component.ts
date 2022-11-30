import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';
import { ManagerService } from '../../core/services/manager.service';
import { HealthSafetyManagerService } from '../../core/services/health-safety-manager.service';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-today-approval-revoke',
	templateUrl: './today-approval-revoke.component.html',
	styleUrls: ['./today-approval-revoke.component.scss']
})
export class TodayApprovalRevokeComponent extends BaseModal implements OnInit {

	has: boolean = true;
	type: string;
	_id: string;
	isArchived: boolean;
	requestStatus: string;

	reason: string;
	reasonText: string;
	status: string;
	requestDate: any;
	reviewDate: any;
	name: string;
	transportation: string;
	origin: string;
	originRisk: string;
	riskRating: any;
	destination: string;
	destinationFloor: string;
	destinationRisk: string;
	startDate: Date;
	startDisplayDate: string;
	endDate: Date;
	endDisplayDate: string;
	period: string;
	purpose: string;
	location: string;

	requestedItem: string = '';
	pickupPoint: string = '';
	pickupTime: string = '';
	quantity: string = '';
	remarks: string = '';
	rejection: string = '';

	constructor(
		protected injector: Injector,
		private managerService: ManagerService,
		private hscService: HealthSafetyManagerService,
		public utilsService: UtilsService,
		private modalService: ModalService,
	) {
		super();
		this.type = this.injector.get('type');
		this._id = this.injector.get('_id');
		this.isArchived = this.injector.get('isArchived');
		this.requestStatus = this.injector.get('requestStatus');

		console.log('achieved', this.isArchived);
	}

	ngOnInit() {
		this.getRequestDetail(this.type, this._id);
		console.log('Modal Type Comp:', this.type);
		console.log('achieved', this.isArchived);
	}

	revokeRequest() {
		const param = [];
		param.push({ _id: this._id, reason: this.rejection });
		if (this.type === 'travel') {
			this.managerService.revokeRequestDetailById(param)
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
			this.hscService.revokeRequestItemDetailById(param)
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

	closeModal() {
		this.modalService.destroy();
		this.type='';
		console.log('Modal type close', this.type);
	}

	getRequestDetail(type, id) {
		console.log('Modal open', type);
		if (type === 'travel') {
			this.managerService.getRequestDetailById(id).subscribe(
				response => {
					console.log(response);
					this.reason = response.rejectReason;
					this.status = response.status.toLowerCase();
					console.log(this.status);
					if(this.status === 'rejected'){
						this.reasonText = 'Rejection';
					}else if(this.status === 'revoked'){
						this.reasonText = 'Revocation';
					}
					this.requestDate = this.utilsService.getDateTimeFormat(new Date(response.requestDate));
					this.reviewDate = this.utilsService.getDateTimeFormat(new Date(response.reviewDate));
					this.name = response.requesterDetails[0].name;
					this.transportation = response.transportation;
					this.origin = response.origin;
					this.originRisk = response.originRisk[0].kategori;
					this.riskRating = response.riskRating;
					this.destination = response.destination;
					this.destinationFloor = response.destinationFloor;
					this.destinationRisk = response.destinationRisk[0].kategori;
					this.startDate = new Date(response.startDate);
					this.startDisplayDate = this.utilsService.getDateTimeFormat(this.startDate);
					this.endDate = new Date(response.endDate);
					this.endDisplayDate = this.utilsService.getDateTimeFormat(this.endDate);
					this.period = response.period;
					this.purpose = response.purpose;
					this.location = response.geoTag.description;
				},
				error => {
					console.log(error);
				});
		} else {
			this.hscService.getItemRequestDetailById(id).subscribe(
				response => {
					console.log(response);
					this.reason = response.reason;
					this.status = response.status.toLowerCase();
					if(this.status === 'rejected'){
						this.reasonText = 'Rejection';
					}else if(this.status === 'revoked'){
						this.reasonText = 'Revocation';
					}else{
						this.reasonText = 'Approval';
					}
					this.requestDate = this.utilsService.getDateTimeFormat(new Date(response.requestDate));
					this.reviewDate = this.utilsService.getDateTimeFormat(new Date(response.reviewDate));
					this.name = response.requesterDetails[0].name;
					this.requestedItem = response.itemType;
					this.pickupPoint = response.pickupPoint;
					this.pickupTime = this.utilsService.getDateTimeFormat(new Date(response.pickupTime));
					this.quantity = response.quantity;
					this.remarks = response.remarks;
				},
				error => {
					console.log(error);
				});
		}
	}
}
