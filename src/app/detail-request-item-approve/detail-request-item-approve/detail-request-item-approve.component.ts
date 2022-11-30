import { Component, OnInit } from '@angular/core';
import { HealthSafetyManagerService } from '../../core/services/health-safety-manager.service';
import { ManagerService } from '../../core/services/manager.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-detail-request-item-approve',
	templateUrl: './detail-request-item-approve.component.html',
	styleUrls: ['./detail-request-item-approve.component.scss']
})
export class DetailRequestItemApproveComponent implements OnInit {

	hrefId;
	isValidId = false;

	requestDate: Date;
	displayDate: string;
	requesterName = '';
	requestedItem = '';
	pickupPoint = '';
	pickupTime = '';
	rejection = '';
	userType = '';
	remarks = '';
	quantity = '';
	status: string;

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
			this.getRequestDetail(this.hrefId);
		});
	}

	showSuccess() {
		this.toastr.success('Hello world!', 'Toastr fun!');
	}

	showError(errorMessage) {
		if(errorMessage === '' || errorMessage === null || errorMessage === undefined){
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	getRequestDetail (id) {
		this.healthService.getItemRequestDetailById(id)
		.subscribe(
			response => {
				this.isValidId = true;
				this.displayDate = this.utilsService.getDateTimeFormat(new Date(response.requestDate));
				this.requesterName = response.requesterDetails[0].name;
				this.requestedItem = response.itemType;
				this.pickupPoint = response.pickupPoint;
				this.quantity = response.quantity;
				this.remarks = response.remarks;
				this.pickupTime = this.utilsService.getDateTimeFormat(new Date(response.pickupTime));
				this.status = response.status.toLowerCase();

				console.log(response);
			},
			error => {
				this.isValidId = false;
				console.log(error);
				this.showError(error.error);
			}
		);
	}

	approveRequest() {
		this.getRequestDetail(this.hrefId);
		if (this.isValidId) {
			const param = [];
			param.push({_id: this.hrefId, reason: this.rejection});
			this.healthService.approveItemRequestDetailById(param)
			.subscribe(
				response => {
					console.log(response);
					this.router.navigate(['/dashboard'], {
						queryParams: {
							userType : localStorage.getItem('userType'),
						}
					}).then(() => {
						window.location.reload();
					});
				},
				error => {
					console.log(error);
					this.showError(error.error);
				});
		} else {
			this.showError("Id is invalid or no longer exists");
		}
	}

	rejectRequest() {
		this.getRequestDetail(this.hrefId);
		if (this.isValidId) {
			const param = [];
			param.push({_id: this.hrefId, reason: this.rejection});
			this.healthService.rejectItemRequestDetailById(param)
			.subscribe(
				response => {
					console.log(response);
					this.router.navigate(['/dashboard'], {
						queryParams: {
							userType : localStorage.getItem('userType'),
						}
					}).then(() => {
						window.location.reload();
					});
				},
				error => {
					console.log(error);
					this.showError(error.error);
				});
		} else {
			this.showError("Id is invalid or no longer exists");
		}
	}

}
