import { Component, Input, OnInit } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormControl
} from '@angular/forms';
import { ModalService } from 'carbon-components-angular';
import { CancelModalComponent } from '../../cancel-modal/cancel-modal/cancel-modal.component';
import { EmployeeService } from '../../core/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SampleModalComponent } from '../../sample-modal/sample-modal/sample-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FunService } from '../../core/services/fun.service';

@Component({
	selector: 'app-account-settings',
	templateUrl: './account-settings.component.html',
	styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
	@Input() modalText = 'Hello, World';
	@Input() size = 'default';
	public work: any = [
	];

	public districts: any = [];
	public filteredDistricts: any = this.districts;

	public filteredWork: any = this.work;

	type: any;

	// NgModel
	nameValue: any;
	phoneValue: any = '';
	nikValue: any = '';
	invalidPhone = false;
	invalidNIK = false;
	emailValue: any = '';
	invalidEmail = false;
	addressValue: any;
	districtValue: any;
	invalidDistrict = false;
	zipValue: any = '';
	workValue: any = '';

	public vaccinationCertificate: File;

	firstTimeLoadedDistrict = true;

	// Observable subject
	districtUpdate = new Subject<String>();
	// Store target value
	targetValue: any = '';

	isChecked: any;
	isNew: any;

	constructor(
		public modalService: ModalService,
		public employeeService: EmployeeService,
		private router: Router,
		public toastr: ToastrService,
		private activatedRoute: ActivatedRoute,
		private funService: FunService,
		) { }

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			const token = params.token;
			if (token !== undefined) {
				const decodedToken = this.funService.getDecodedAccessToken(token);
				localStorage.setItem('token', token);
				localStorage.setItem('exp', decodedToken.exp);
				this.router.navigate(['/account'], {
					queryParams: { state : 'default' }
				});
			}
		});

		this.getUserDashboard();
		this.searchDestination('', 'office');

		this.districtUpdate.pipe(
			debounceTime(400),
			distinctUntilChanged())
			.subscribe(value => {
				this.onSearchDistricts(value);
			});
	}

	openModal() {
		this.modalService.create({
			component: SampleModalComponent,
			inputs: {
				type: this.type
			}
		});
	}

	showSuccess() {
		this.toastr.success('Succesfully uploaded vaccination certificate');
	}

	showError(errorMessage) {
		if(errorMessage === '' || errorMessage === null || errorMessage === undefined){
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	backToDashboard() {
		this.router.navigate(['/dashboard']);
	}

	getUserDashboard() {
		this.employeeService.getUserDashboard()
		.subscribe(
			response => {
			this.nameValue = response.name;
			this.phoneValue = response.phone;
			this.nikValue = response.nik;

			if (response.managerEmailIBM !== '') {
				this.emailValue = response.managerEmailIBM;
			} else {
				this.emailValue = response.managerEmailJTI;
			}

			this.addressValue = response.home;

			this.districtValue = response.district;
			this.searchDistrict(response.district.toLowerCase());

			this.zipValue = response.zipcode;
			this.isNew = response.isNew;
			this.workValue = response.work;
			this.isChecked = response.isChecked;
			
			this.employeeService.getVaccinationCertificate().subscribe(
				res => {
				  this.vaccinationCertificate = this.blobToFile(res, 'Vaccination Certificate');
				},
				error => {
				  console.log(error);
			});
		},
		error => {
			console.log(error);
			this.showError(error.error);
		});
	}

	onPhoneInput(event) {
		if (event.srcElement.value === '') {
			this.invalidPhone = true;
		} else {
			this.invalidPhone = false;
		}
	}

	onNIKInput(event) {
		if (event.srcElement.value === '') {
			this.invalidNIK = true;
		} else {
			this.invalidNIK = false;
		}
	}

	onEmailInput(event) {
		if (event.srcElement.value === '') {
			this.invalidEmail = true;
		} else {
			this.invalidEmail = false;
		}
	}

	searchDistrict(district?) {
		this.employeeService.searchDistrict(district)
		.subscribe(
			response => {
				this.districts = [];
				response.forEach(element => {
					const newDistrict = {
						'content': element.title,
						'category': element.kategori,
						'lat': element.lokasi.lat,
						'long': element.lokasi.lon,
						'selected': false
					};

					this.districts.push(newDistrict);
				});

				this.filteredDistricts = this.districts.filter(item => item.content.toLowerCase().includes(district));

				if (this.firstTimeLoadedDistrict) {
					if (this.filteredDistricts.length !== [] && this.filteredDistricts !== undefined) {
						this.filteredDistricts[0].selected = true;
					}

					this.firstTimeLoadedDistrict = false;
				}
		},
		error => {
			console.log(error);
			this.showError(error.error);
		});
	}

	searchDestination(destination?, filter?) {
		this.employeeService.searchDestination(destination, filter).pipe(debounceTime(0))
		.subscribe(
			response => {
				this.work = [];

				response.forEach(element => {
					const newDestination = {
						'content': element.name,
						'address': element.address,
						'district': element.location
					};

					this.work.push(newDestination);
				});
		},
		error => {
			console.log(error);
			this.showError(error.error);
		});
	}

	onSelectedDistricts(event) {
		if (event.length === 0) {
			this.invalidDistrict = true;
			return;
		}

		this.invalidDistrict = false;
	}

	onSearchDistricts(event) {
		this.invalidDistrict = true;
		const filter = event.srcElement.value.toLowerCase();
		if (filter !== this.targetValue) {
			this.targetValue = filter;
			this.searchDistrict(filter);

			if (event.srcElement.value === '') {
				this.districtValue = '';
			}
		}
	}

	onSelectedWork(event) {
		const selected = event.item.content;
	}

	onSearchWork(event) {
		const filter = event.srcElement.value.toLowerCase();

		this.filteredWork = this.work.filter(item => item.content.toLowerCase().includes(filter));

		if (event.srcElement.value === '') {
			this.workValue = '';
		}
	}

	cancelModal() {
		this.modalService.create({
			component: CancelModalComponent,
			inputs: {
				modalText: this.modalText,
				size: this.size
			}
		});
	}

	updateEmployee() {
		const res = this.emailValue.split('@')[1];
		let content: any;

		if (this.workValue.selected) {
			this.workValue = this.workValue.content;
		}

		if (this.phoneValue === '' || this.invalidPhone) {
			this.showError('Please fill in your Phone Number');
			return;
		}

		if (this.emailValue === '' || this.invalidEmail) {
			this.showError('Please fill in your E-mail');
			return;
		}

		if (this.districtValue === undefined || this.invalidDistrict) {
			this.showError('Please fill in your District');
			return;
		}

		if (this.districtValue.selected) {
			this.districtValue = this.districtValue.content;
		}

		if (this.zipValue === '') {
			this.showError('Please fill in your Zip-Code');
			return;
		}

		if (res === 'ibm-jti.com') {
			content = {
				'phone': this.phoneValue,
				'nik' : this.nikValue,
				'home': this.addressValue,
				'district': this.districtValue,
				'zipcode': this.zipValue,
				'work': this.workValue,
				'managerEmailJTI': this.emailValue
			};
		} else {
			content = {
				'phone': this.phoneValue,
				'nik' : this.nikValue,
				'home': this.addressValue,
				'district': this.districtValue,
				'zipcode': this.zipValue,
				'work': this.workValue,
				'managerEmailIBM': this.emailValue
			};
		}

		this.employeeService.updateEmployeeData(content).subscribe(
			response => {
			this.type = 'updateAccount';

			if (this.isChecked === 'N') {
				this.router.navigate(['/daily-checkup']);
			} else {
				this.openModal();
				this.employeeService.headerStatusEmitter().emit();
			}
		},
			error => {
			console.log(error);
			this.showError(error.error);
		});
	}

	onSelectFile() {
		document.getElementById('file').click();
	}

	onFileSelected(event: any) {
		if (event.target.files && event.target.files[0]) {
		  this.vaccinationCertificate = event.target.files[0];

		  const file = {
			  file: this.vaccinationCertificate
		  }

		  console.log(file);
		  this.employeeService.uploadVaccinationCertificate(file).subscribe(
			response => {
			  this.showSuccess();
			},
			(error) => {
			  console.log(error);
			  this.showError('Failed to upload vaccination certificate, please retry');
			});
		}
	}

	onGetAttachment() {
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
