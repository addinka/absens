import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../core/services/manager.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-detail-request-approve',
	templateUrl: './detail-request-approve.component.html',
	styleUrls: ['./detail-request-approve.component.scss']
})

export class DetailRequestApproveComponent implements OnInit {

	hrefId;
	isValidId = false;

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
	rejection = '';
	status: string;
	location: string;
	has = true;

	isVaccinated = '';

	public vaccinationCertificate: File;
	public documentIcon = '../../assets/icons/letter_duty.svg';

	constructor(
		public router: Router,
		protected managerService: ManagerService,
		public activatedRoute: ActivatedRoute,
		public toastr: ToastrService,
		public utilsService: UtilsService,
	) { }
	
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
		this.managerService.getRequestDetailById(id)
		.subscribe(
			response => {
				this.isValidId = true;
				this.requestDate = new Date(response.requestDate);
				this.displayDate = this.utilsService.getDateTimeFormat(new Date(this.requestDate));
				this.requesterName = response.requesterDetails[0].name;
				this.isVaccinated = response.requesterDetails[0].isVaccinated;
				this.transportation = response.transportation;
				this.origin = response.origin;
				this.originRisk = response.originRisk[0].kategori;
				this.riskRating  = response.riskRating;
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
				this.status = response.status.toLowerCase();
				console.log(response);

				if (response.requesterDetails[0].isVaccinated === 'Y') {
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
				this.isValidId = false;
				console.log(error);
				this.showError(error.error);
			}
		);
	}

	approveRequest() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;

		this.getRequestDetail(this.hrefId);
		if (this.isValidId) {
			const param = [];
			param.push({_id: this.hrefId, reason: this.rejection});
			this.managerService.approveRequestDetailById(param)
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
		const buttonRejectElement = (<HTMLInputElement>document.getElementById('buttonReject'));
		buttonRejectElement.disabled = true;

		this.getRequestDetail(this.hrefId);
		if (this.isValidId) {
			const param = [];
			param.push({_id: this.hrefId, reason: this.rejection});
			this.managerService.rejectRequestDetailById(param)
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

	openVaccinationCertificate() {
		const url = window.URL.createObjectURL(this.vaccinationCertificate);
		window.open(url, '_blank');
	}

	public blobToFile = (theBlob: Blob, fileName: string): File => {
		const b: any = theBlob;
		// A Blob() is almost a File() - it's just missing the two properties below which we will add
		console.log(b);
		b.lastModifiedDate = new Date();
		b.name = fileName;
	
		// Cast to a File() type
		return theBlob as File;
	}
}
