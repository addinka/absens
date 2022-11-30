import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { ManagerService } from '../../core/services/manager.service';
import { UtilsService } from '../../core/services/utils.service';
import {
	FormGroup,
	FormBuilder,
	FormControl
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-review-request',
	templateUrl: './review-request.component.html',
	styleUrls: ['./review-request.component.scss']
})



export class ReviewRequestComponent extends BaseModal {
	modalId: string;
	requestDate: Date;
	displayDate: string;
	requesterName = '';
	requesterID = '';
	transportation = '';
	origin = '';
	originRisk: string;
	riskRating: any;
	destination = '';
	destinationFloor = '';
	destinationRisk: string;
	startDate: Date;
	startDisplayDate: string;
	endDate: Date;
	endDisplayDate: string;
	period = '';
	purpose = '';
	location = '';
	rejection = '';
	has = true;

	isVaccinated = '';

	public vaccinationCertificate: File;
	public documentIcon = '../../assets/icons/letter_duty.svg';


	constructor(protected injector: Injector, protected managerService: ManagerService, 
		public toastr: ToastrService, public utilsService: UtilsService) {
		super();
		this.modalId = this.injector.get('modalText');
	}
	// tslint:disable-next-line:use-lifecycle-interface
	ngOnInit() {
		this.managerService.getRequestDetailById(this.modalId)
		.subscribe(
			response => {
				this.requestDate = new Date(response.requestDate);

				this.displayDate = this.utilsService.getDateTimeFormat(this.requestDate);

				this.requesterName = response.requesterDetails[0].name;
				this.requesterID = response.requesterDetails[0]._id;
				this.isVaccinated = response.requesterDetails[0].isVaccinated;
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
				console.log(response);

				if(response.requesterDetails[0].isVaccinated = 'Y') {
					this.managerService.getVaccinationCertificateByID(response.requesterDetails[0]._id).subscribe(
						res => {
						  this.vaccinationCertificate = this.blobToFile(res, 'Vaccination Certificate');
						},
						error => {
						  console.log(error);
					});
				}
			},
			error => {
				console.log(error);
			}
		);
		console.log(this.modalId);
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

	approveRequest() {
		const param = [];
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;

		param.push({_id: this.modalId, reason: this.rejection});
		this.managerService.approveRequestDetailById(param)
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
		const buttonRejectElement = (<HTMLInputElement>document.getElementById('buttonReject'));
		buttonRejectElement.disabled = true;

		const param = [];
		param.push({_id: this.modalId, reason: this.rejection});
		this.managerService.rejectRequestDetailById(param)
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

	openVaccinationCertificate() {
		const url = window.URL.createObjectURL(this.vaccinationCertificate);
		window.open(url, '_blank');
	}

	public blobToFile = (theBlob: Blob, fileName: string): File => {
		const b: any = theBlob;
		// A Blob() is almost a File() - it's just missing the two properties below which we will add
		b.lastModifiedDate = new Date();
		b.name = fileName;
		// Cast to a File() type
		return theBlob as File;
	}
}
