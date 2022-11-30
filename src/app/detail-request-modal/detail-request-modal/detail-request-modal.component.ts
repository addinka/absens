import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';
import { EmployeeService } from '../../core/services/employee.service';
import { UtilsService } from '../../core/services/utils.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-detail-request-modal',
	templateUrl: './detail-request-modal.component.html',
	styleUrls: ['./detail-request-modal.component.scss']
})

export class DetailRequestModalComponent extends BaseModal implements OnInit {

	_id: string;
	letterPressed = false;

	public documentIcon = '../../assets/icons/letter_duty.svg';
	public sendIcon = '../../assets/icons/mail-all.svg';
	public otp = '../../assets/icons/otp.png';
	has = true;

	status: string;
	requestDate: any;
	name: string;
	origin: string;
	originRisk: string;
	riskRating: any;
	reviewDate: any;
	transportation: string;
	startDate: Date;
	startDisplayDate: string;
	endDate: Date;
	endDisplayDate: string;
	period: string;
	destination: string;
	destinationFloor: string;
	destinationRisk: string;
	purpose: string;
	location: string;
	reason: string;
	isActive: string;
	label1: any;
	plazaCountLoop = 0;

	min: any = Number(localStorage.getItem('min'));
	sec: any = Number(localStorage.getItem('sec'));

	reservationId = null;
	dotName = 'Dot0000';
	floorName = 'Floor00';

	intervalId: any;
	 
	public vaccinationCertificate: File;

	constructor(
		protected injector: Injector,
		public modalService: ModalService,
		public employeeService: EmployeeService,
		public utilsService: UtilsService,
		public toastr: ToastrService,
	) {
		super();
		this._id = this.injector.get('_id');
	}

	ngOnInit() {
		this.employeeService.getVaccinationCertificate().subscribe(
			res => {
			  this.vaccinationCertificate = this.blobToFile(res, 'Vaccination Certificate');
			},
			error => {
			  console.log(error);
		});

		this.getRemainingTime();
		this.getReservation();
		this.getRequestDetail(this._id);
		this.label1 = localStorage.getItem('otp');
		if (Number(this.min) !== 0 || (Number(this.min) === 0 && Number(this.sec) !== 0)) {
			this.startTimer(false);
		}
	}

	closeThis() {
		clearInterval(this.intervalId);
		this.closeModal();
	}

	startTimer(fromOTP: boolean) {
		if (fromOTP === true) {
			this.min = 5;
			this.sec = 0;
			localStorage.setItem('min', this.min);
			localStorage.setItem('sec', this.sec);
		}

		this.intervalId = setInterval(() => {
			if (Number(this.sec) - 1 === -1 && Number(this.min) !== 0) {
				this.min -= 1;
				this.sec = 59;
				localStorage.setItem('min', this.min);
				localStorage.setItem('sec', this.sec);
			} else if (Number(this.sec) - 1 !== -1 && Number(this.min) === 0) {
				this.sec -= 1;
				localStorage.setItem('min', this.min);
				localStorage.setItem('sec', this.sec);
			} else if (Number(this.sec) - 1 !== -1 && Number(this.min) !== 0) {
				this.sec -= 1;
				localStorage.setItem('min', this.min);
				localStorage.setItem('sec', this.sec);
			}

			if (this.min === 0 && this.sec === 0) {
				clearInterval(this.intervalId);
				localStorage.setItem('min', this.min);
				localStorage.setItem('sec', this.sec);
				localStorage.setItem('otp', '');
				this.label1 = '';
			}
		}, 1000);
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

	getRemainingTime() {
		this.employeeService.getUserDashboard().subscribe(
			response => {
				let responseDate = new Date(response.otpExpireTime);
				let now = new Date();
				console.log(responseDate);
				console.log(now);

				let dateDiffInTime = Math.ceil((now.getTime() - responseDate.getTime()) / 1000);
				if (Math.sign(dateDiffInTime) === 1) {
					this.min = 0;
					this.sec = 0;
				} else {
					let minutes = Math.floor(Math.abs(dateDiffInTime)/60);
					let seconds = Math.abs(dateDiffInTime)%60;
					console.log(Math.abs(dateDiffInTime));
					console.log(minutes);
					console.log(seconds);
					
					this.min = minutes;
					this.sec = seconds;
				}
			});
	}

	getRequestDetail(id) {
		this.employeeService.getRequestDetail(id).subscribe(
			response => {
				console.log(response);
				this.status = response.status.toLowerCase();
				this.requestDate = this.utilsService.getDateTimeFormat(new Date(response.requestDate));
				this.name = response.requesterDetails[0].name;
				this.isActive = response.isActive;
				const splitString = response.originLocation.split(',');
				this.origin = splitString[0];
				this.originRisk = response.originRisk[0].kategori;
				this.riskRating = response.riskRating;
				this.transportation = response.transportation;
				this.startDate = new Date(response.startDate);
				this.startDisplayDate = this.utilsService.getDateTimeFormat(this.startDate);
				this.endDate = new Date(response.endDate);
				this.endDisplayDate = this.utilsService.getDateTimeFormat(this.endDate);
				this.period = response.period;
				this.destination = response.destination;
				this.destinationFloor = response.destinationFloor;
				this.destinationRisk = response.destinationRisk[0].kategori;
				this.purpose = response.purpose;
				this.location = response.geoTag.description;
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

	getReservation() {
		this.employeeService.getReservationDetail().subscribe(
			response => {
				console.log('dot', response);
				this.reservationId = response._id;
				this.dotName = response.dot_details[0].name;
				this.floorName = response.dot_details[0].floor_details[0].name;
			});
	}

	getOTP() {
		clearInterval(this.intervalId);
		this.employeeService.getOTP().subscribe(
			response => {
				this.label1 = response.Passcode;
				localStorage.setItem('otp', response.Passcode);
				this.startTimer(true);
			},
			error => {
				console.log(error);
				this.showError(error.error);
			});
	}

	releaseSeat(_id) {
		let body = {
			"reservationID": _id
		}

		this.employeeService.releaseReservation(body).subscribe(
			response => {
				console.log(response);
				this.toastr.success('Room reservation has been released.');
				this.reservationId = null;
			},
			error => {
				console.log(error);
				this.showError(error.error);
			});
	}

	openLetter() {
		this.employeeService.getDocument({ idRequest: this._id }).subscribe(
			response => {
				if (navigator.userAgent.includes('iPhone')) {
					window.onclick = function () {
						const blob = new Blob(['Hi'], { type: 'application/octet-stream' });
						const url = URL.createObjectURL(response);
						window.open(url, '_blank');
						window.onclick = null;
					};
				} else {
					const url = URL.createObjectURL(response);
					window.open(url, '_blank');
				}
			});
		/* this.letterPressed = true;
    	console.log(this.letterPressed); */
	}

	openPlazaAccess() {
		console.log(this.plazaCountLoop);
		this.employeeService.getPlazaAccess().subscribe(
			response => {
				if (navigator.userAgent.includes('iPhone')) {
					window.onclick = function () {
						const blob = new Blob(['Hi'], { type: 'application/octet-stream' });
						const url = URL.createObjectURL(response);
						window.open(url, '_blank');
						window.onclick = null;
					};
				} else {
					const url = URL.createObjectURL(response);
					window.open(url, '_blank');
				}

				this.plazaCountLoop = 0;
				// console.log('success');
				// const url = window.URL.createObjectURL(response);
				// window.open(url, '_blank');
				// this.plazaCountLoop = 0;
			},
			error => {
				console.log('error');
				this.plazaCountLoop++;
				if (this.plazaCountLoop < 5) {
					this.openPlazaAccess();
				} else {
					this.showError('Failed to generate Plaza permit. Please try again');
					this.plazaCountLoop = 0;
				}
			}
		);
		/* this.letterPressed = true;
    	console.log(this.letterPressed); */
	}

	sureCancel() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;
		this.employeeService.cancelTravel({
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
