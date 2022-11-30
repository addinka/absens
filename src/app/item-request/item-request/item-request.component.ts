import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';
import { HealthSafetyManagerService } from '../../core/services/health-safety-manager.service';
import { ManagerService } from '../../core/services/manager.service';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-item-request',
	templateUrl: './item-request.component.html',
	styleUrls: ['./item-request.component.scss']
})
export class ItemRequestComponent extends BaseModal implements OnInit {

	modalId: string;
	letterPressed = false;

	requestDate: Date;
	displayDate: string;
	requesterName = '';
	requestedItem = '';
	pickupPoint = '';
	pickupTime = '';
	quantity = '';
	remarks = '';
	rejection = '';
	userType = '';

	public documentIcon = '../../assets/icons/letter_duty.svg';
	public sendIcon = '../../assets/icons/mail-all.svg';
	has = true;



	constructor(protected injector: Injector,
		protected healthService: HealthSafetyManagerService,
		protected managerService: ManagerService,
		public utilsService: UtilsService) {
		super();
		this.modalId = this.injector.get('modalText');
	}
	ngOnInit() {
		this.healthService.getItemRequestDetailById(this.modalId)
		.subscribe(
			response => {
				this.displayDate = this.utilsService.getDateTimeFormat(new Date(response.requestDate));
				this.requesterName = response.requesterDetails[0].name;
				this.requestedItem = response.itemType;
				this.pickupPoint = response.pickupPoint;
				this.pickupTime = this.utilsService.getDateTimeFormat(new Date(response.pickupTime));
				this.quantity = response.quantity;
				this.remarks = response.remarks;
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
		console.log(this.modalId);
	}

	approveRequest() {
		this.userType = localStorage.getItem('userType');
		const param = [];
		param.push({_id: this.modalId, reason: this.rejection});
		this.healthService.approveItemRequestDetailById(param)
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
		this.healthService.rejectItemRequestDetailById(param)
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
