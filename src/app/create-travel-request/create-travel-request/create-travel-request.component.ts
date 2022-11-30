import {
	Component,
	Input,
	OnInit
} from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms';
import { ModalService } from 'carbon-components-angular';
import { CancelModalComponent } from '../../cancel-modal/cancel-modal/cancel-modal.component';
import { SampleModalComponent } from '../../sample-modal/sample-modal/sample-modal.component';
import { EmployeeService } from '../../core/services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UtilsService } from '../../core/services/utils.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Post {
	date: Date;
}

@Component({
	selector: 'app-create-travel-request',
	templateUrl: './create-travel-request.component.html',
	styleUrls: ['./create-travel-request.component.scss']
})
export class CreateTravelRequestComponent implements OnInit {
	@Input() modalText = 'Hello, World';
	@Input() size = 'default';
	public homeDetails: any;
	public origin: any = [
		{
			content: 'Home'
		}
	];

	public filteredOrigin: any = this.origin;

	public workDetails: any;
	public destination: any = [
		{
			content: 'Office'
		}
	];

	public filteredDestination: any = this.destination;

	public districts: any = [];
	public filteredOriginDistricts: any = this.districts;
	public filteredDestinationDistricts: any = this.districts;

	public period: any = [
		{
			content: 'Full-day S1 (08:00 - 17:00)'
		},
		{
			content: 'Full-day S2 (15:00 - 24:00)'
		},
		{
			content: 'Full-day S3 (23:00 - 08:00)'
		},
		{
			content: 'Half-day AM (08:00 - 12:00)'
		},
		{
			content: 'Half-day PM (13:00 - 17:00)'
		},
		{
			content: 'Short Visit'
		}
	];

	public transport: any = [
		{
			content: 'Private Car'
		},
		{
			content: 'Private Motorcycle'
		},
		{
			content: 'Taxi/GrabCar/GoCar'
		},
		{
			content: 'Airplane'
		},
		{
			content: 'Ship / Ferry'
		},
		{
			content: 'Rental Car'
		},
		{
			content: 'GrabBike/GoRide'
		},
		{
			content: 'Public Transports'
		}
	];

	floors: any = [
		{
			content: '16'
		},
		{
			content: '17'
		}
	];

	destinationRiskLevel = '';
	destinationStatus = '';
	docType = '';

	// ngModel Values

	originValue: any = 'Home';
	originInvalid = false;
	originAddressValue: any;
	originDistrict: any = 'District (Kecamatan)'; // this.originDistrict.content for the data
	invalidOriginDistrict = false;
	destinationValue: any = 'Office/Client'; // this.destinationValue.content for the data
	destinationInvalid = false;
	destinationFloorValue: any;
	destinationFloorInvalid = true;
	destinationAddressValue: any;
	destinationDistrict: any = 'District (Kecamatan)'; // this.destinationDistrict.content for the data
	invalidDestinationDistrict = false;
	periodValue: any = 'Full-day S1 (08:00 - 17:00)'; // this.periodValue.content for the data
	purposeValue: any;
	purposeInvalid = true;
	transportationValue: any = 'Private Car'; // this.transportationValue.content for the data
	type: any;
	startDate: any;
	endDate: any;
	storedStart = new Date();
	storedEnd = new Date();
	loopDate: any;

	post: Post = {
		date: new Date()
	};

	submitForm: FormGroup;

	// Hide or Show Details
	showOriginDetails = false;
	showDestinationDetail = false;

	// Observable
	originUpdate = new Subject<String>();
	targetValueOrigin: any = '';

	districtUpdate = new Subject<String>();
	targetValueDistrict: any = '';

	destinationUpdate = new Subject<String>();
	targetValueDestination: any = '';

	destinationDistrictUpdate = new Subject<String>();
	targetValueDestinationDistrict: any = '';

	position: any;
	latitude: any;
	longitude: any;
	address: any;
	googleAPIKey = 'AIzaSyBd55pe5Di9_o0R4Gtp1kLjHTs4uz_EHEM';

	constructor(
		public modalService: ModalService,
		public employeeService: EmployeeService,
		private router: Router,
		public toastr: ToastrService,
		public utilsService: UtilsService,
		private fb: FormBuilder) {

			this.submitForm = this.fb.group({
				startDate: ['', Validators.required],
				endDate: ['', Validators.required],
			});
		}

	async ngOnInit() {
		this.getUserDashboard();

		this.originUpdate.pipe(
			debounceTime(400),
			distinctUntilChanged())
			.subscribe(value => {
				this.onSearchOrigin(value);
			});

		this.districtUpdate.pipe(
			debounceTime(400),
			distinctUntilChanged())
			.subscribe(value => {
				this.onSearchOriginDistricts(value);
			});

		this.destinationUpdate.pipe(
			debounceTime(400),
			distinctUntilChanged())
			.subscribe(value => {
				this.onSearchDestination(value);
			});

		this.destinationDistrictUpdate.pipe(
			debounceTime(400),
			distinctUntilChanged())
			.subscribe(value => {
				this.onSearchDestinationDistricts(value);
			});

			this.post.date.setHours(0, 0, 0, 0);
			this.submitForm.controls['startDate'].setValue(this.post.date);
			this.submitForm.controls['startDate'].updateValueAndValidity();

			this.submitForm.controls['endDate'].setValue(this.post.date);
			this.submitForm.controls['endDate'].updateValueAndValidity();

			// this.storedStart.setHours(0, 0, 0, 0);
			// this.storedEnd.setHours(0, 0, 0, 0);
			await this.getCurrentPosition();
			this.address = await this.utilsService.getAddress(this.position.coords.latitude, this.position.coords.longitude);
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

	clear(event, type) {
		event.srcElement.value = '';

		if (type === 'Origin') {
			this.origin = [];
			this.filteredOrigin = [];
		} else {
			this.destination = [];
			this.filteredDestination = [];
		}
	}

	selectDate(type, event) {

		const currDate = new Date();

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		// yesterday.setHours(0, 0, 0, 0);

		const startDateBOD = new Date(this.submitForm.value.startDate.setHours(0, 0, 0, 0));

		const timeSpace = Math.round((startDateBOD.getTime() - currDate.getTime()) / 60000);

		const day = Math.round(((this.submitForm.value.endDate.getTime()) - (this.submitForm.value.startDate.getTime())) / (3600000 * 24));
		// console.log(day);

		if (type === 'start') {
			if (event.value === undefined) {
				this.showError('Please fill your Start Date');
				this.submitForm.controls['startDate'].setValue(this.storedStart);
				this.submitForm.controls['startDate'].updateValueAndValidity();
				return;
			} else if (event.value < today ) {
				console.log(event.value);
				console.log(today);
				this.showError('Start Date cannot be in the past');
				this.submitForm.controls['startDate'].setValue(this.storedStart);
				this.submitForm.controls['startDate'].updateValueAndValidity();
				return;
			} else if (timeSpace > 1440 ) {
				this.showError('Travel request can only be submitted the day before, please choose another date');
				this.submitForm.controls['startDate'].setValue(this.storedStart);
				this.submitForm.controls['startDate'].updateValueAndValidity();
				return;
			}
		} else {
			if (event.value === undefined) {
				this.showError('Please fill your End Date');
				this.submitForm.controls['endDate'].setValue(this.storedEnd);
				this.submitForm.controls['endDate'].updateValueAndValidity();
				return;
			} else if (event.value < yesterday) {
				console.log('date', event.value);
				console.log('yesterday', yesterday);
				this.showError('End Date cannot be in the past');
				this.submitForm.controls['endDate'].setValue(this.storedEnd);
				this.submitForm.controls['endDate'].updateValueAndValidity();
				return;
			}
		}

		// this.loopDate = this.submitForm.value.startDate.getDay();
		// console.log(this.loopDate);

		// for (let i = 0; i <= day; i++) {
		// 	if ( this.loopDate % 7 === 0 || this.loopDate % 7 === 6 ) {
		// 		this.showError('You cannot make travel request on weekend');
		// 		this.submitForm.controls['startDate'].setValue(this.storedStart);
		// 		this.submitForm.controls['startDate'].updateValueAndValidity();

		// 		this.submitForm.controls['endDate'].setValue(this.storedEnd);
		// 		this.submitForm.controls['endDate'].updateValueAndValidity();
		// 		return;
		// 	}
		// 	this.loopDate++;
		// }

		if (this.submitForm.value.endDate < this.submitForm.value.startDate) {
			this.submitForm.controls['endDate'].setValue(this.submitForm.controls['startDate'].value);
			this.submitForm.controls['endDate'].updateValueAndValidity();
			return;
		} else {
			if (type === 'start') {
				this.storedStart = event.value;
			} else {
				this.storedEnd = event.value;
			}
		}
	}

	getUserDashboard() {
		this.employeeService.getUserDashboard()
			.subscribe(
				response => {
					if (response.isNew === 'Y') {
						this.router.navigate(['/account']);
						this.toastr.error('You have to fill your account information before anything');
						this.employeeService.headerStatusTrueEmitter().emit();
					} else if (response.isChecked === 'N') {
						this.router.navigate(['/daily-checkup']);
						this.toastr.error('You have to do your daily checkup before doing anything for today');
						this.employeeService.headerStatusTrueEmitter().emit();
					} else {
						this.originValue = 'Home';
						this.originAddressValue = response.home;
						this.originDistrict = response.district;

						if (response.district === '') {
							response.district = 'District (Kecamatan)';
						}

						this.homeDetails = [
							{
								'content': 'Home',
								'address': response.home,
								'district': response.district,
								'selected': true
							},
						];

						if (response.home === '' || response.district === '') {
							this.showOriginDetails = true;
						}

						this.filteredOrigin = this.homeDetails;

						this.destinationValue = response.work;

						if (response.work !== undefined) {
							this.getDestinationRiskLevel(response.work);
							this.getDestinationStatus(response.work);
						}

						if (response.workDetails[0]) {
							this.destinationAddressValue = response.workDetails[0].address;
							this.destinationDistrict = response.workDetails[0].location;
						} else {
							this.destinationDistrict = 'District (Kecamatan)';
						}

						this.destination = [
							{
								'content': response.work,
								'address': this.destinationAddressValue,
								'district': this.destinationDistrict,
								'selected': true
							},
						];

						if (response.workDetails.address === '' || response.workDetails.location === '') {
							this.showDestinationDetail = true;
						}

						this.filteredDestination = this.destination;
						this.workDetails = this.destination;
					}
				},
				error => {
					console.log(error);
					this.showError(error.error);
				});
	}

	searchDistrict(district?, type?) {
		this.employeeService.searchDistrict(district).pipe(debounceTime(0))
			.subscribe(
				response => {
					if (type === 'origin') {
						this.districts = [];
						response.forEach(element => {
							const newDistrict = {
								'content': element.title,
								'category': element.kategori,
								'lat': element.lokasi.lat,
								'long': element.lokasi.lon
							};

							this.districts.push(newDistrict);
						});
						this.filteredOriginDistricts = this.districts.filter(item => item.content.toLowerCase().includes(district));
					} else if (type === 'destination') {
						this.districts = [];
						response.forEach(element => {
							const newDistrict = {
								'content': element.title,
								'category': element.kategori,
								'lat': element.lokasi.lat,
								'long': element.lokasi.lon
							};

							this.districts.push(newDistrict);
						});
						this.filteredDestinationDistricts = this.districts.filter(item => item.content.toLowerCase().includes(district));
					}
				},
				error => {
					console.log(error);
					this.showError(error.error);
				});
	}

	searchDestination(destination?, type?) {
		this.employeeService.searchDestination(destination).pipe(debounceTime(0))
			.subscribe(
				response => {
					this.origin = [];
					const home = {
						'content': this.homeDetails[0].content,
						'address': this.homeDetails[0].address,
						'district': this.homeDetails[0].district
					};
					this.origin.push(home);

					this.destination = [];

					if (type === 'origin') {
						response.forEach(element => {
							const newOrigin = {
								'content': element.name,
								'address': element.address,
								'district': element.location
							};

							this.origin.push(newOrigin);
						});
						this.filteredOrigin = this.origin.filter(item => item.content.toLowerCase().includes(destination.toLowerCase()));

						const newInput = {
							'content': 'Other: ' + destination
						};

						if (destination !== '' && this.filteredOrigin.length === 0) {
							this.filteredOrigin.push(newInput);
						}
					} else if (type === 'destination') {
						response.forEach(element => {
							const newDestination = {
								'content': element.name,
								'address': element.address,
								'district': element.location
							};

							this.destination.push(newDestination);
						});
						this.filteredDestination = this.destination.filter(item => item.content.toLowerCase().includes(destination.toLowerCase()));

						const newInput = {
							'content': 'Other: ' + destination
						};

						if (destination !== '' && this.filteredDestination.length === 0) {
							this.filteredDestination.push(newInput);
						}
					}
				},
				error => {
					console.log(error);
					this.showError(error.error);
				});
	}

	getDestinationRiskLevel(work) {
		this.employeeService.searchDestination(work)
			.subscribe(
				response => {
					if (response[0].location === '') {
						return;
					}

					if (response[0].location !== undefined) {
						this.getDistrictRiskLevel(response[0].location);
					}
			});
	}

	getDestinationStatus(work) {
		this.employeeService.searchDestination(work)
			.subscribe(
				response => {
					if (response[0].location !== undefined) {
						this.destinationStatus = response[0].status.charAt(0).toUpperCase() + response[0].status.slice(1).toLowerCase();
						this.docType = response[0].docType;
					}
			});
	}

	getDistrictRiskLevel(location) {
		this.employeeService.searchDistrict(location)
			.subscribe(
				response => {
					if (response[0].kategori !== undefined) {
						this.destinationRiskLevel = response[0].kategori;
					}
			});
	}

	onSelectedOrigin(event) {
		if (event.length === 0) {
			this.originInvalid = true;

			return;
		}

		const selected = event.item.content;
		this.originInvalid = false;

		if (event.item.content) {
			if (event.item.address === '' || event.item.address === undefined
				|| event.item.district === '' || event.item.district === undefined) {
				event.item.district = 'District (Kecamatan)';
				this.showOriginDetails = true;
			} else {
				this.showOriginDetails = false;
			}

			this.originAddressValue = event.item.address;
			this.originDistrict = event.item.district;
		}
	}

	onSearchOrigin(event) {
		this.originInvalid = true;

		const filter = event.srcElement.value;
		if (this.targetValueOrigin !== filter) {
			this.targetValueOrigin = filter;
			this.searchDestination(filter, 'origin');


			if (event.srcElement.value === '') {
				this.originValue = '';
			}
		}

	}

	onSelectedOriginDistricts(event) {
		if (event.length === 0) {
			this.invalidOriginDistrict = true;

			return;
		}

		const selected = event.item.content;
		this.invalidOriginDistrict = false;
	}

	onSearchOriginDistricts(event) {
		this.invalidOriginDistrict = true;
		const filter = event.srcElement.value.toLowerCase();
		if (this.targetValueDistrict !== filter) {
			this.targetValueDistrict = filter;
			this.searchDistrict(filter, 'origin');


			if (event.srcElement.value === '') {
				this.originDistrict = '';
			}
		}
	}

	onSelectedDestination(event) {
		this.destinationRiskLevel = '';
		this.destinationStatus = '';
		if (event.length === 0) {
			this.destinationInvalid = true;

			return;
		}

		const selected = event.item.content;

		this.destinationInvalid = false;

		if (event.item.address === '' || event.item.address === undefined
			|| event.item.district === '' || event.item.district === undefined) {
			event.item.district = 'District (Kecamatan)';
			this.showDestinationDetail = true;
		} else {
			this.showDestinationDetail = false;
		}

		this.destinationAddressValue = event.item.address;
		this.destinationDistrict = event.item.district;

		this.getDestinationRiskLevel(event.item.content);
		this.getDestinationStatus(event.item.content);
	}

	onSearchDestination(event) {
		this.destinationInvalid = true;
		this.destinationFloorValue = '';
		const filter = event.srcElement.value;
		if (this.targetValueDestination !== filter) {
			this.targetValueDestination = filter;
			this.searchDestination(filter, 'destination');

			if (event.srcElement.value === '') {
				this.destinationValue = '';
			}
		}
	}

	onSelectedDestinationDistricts(event) {
		this.destinationRiskLevel = '';
		if (event.length === 0) {
			this.invalidDestinationDistrict = true;

			return;
		}

		const selected = event.item.content;
		this.getDistrictRiskLevel(event.item.content);
		this.invalidDestinationDistrict = false;
	}

	onSearchDestinationDistricts(event) {
		this.invalidDestinationDistrict = true;
		const filter = event.srcElement.value.toLowerCase();
		if (this.targetValueDestinationDistrict !== filter) {
			this.targetValueDestinationDistrict = filter;
			this.searchDistrict(filter, 'destination');

			this.filteredDestinationDistricts = this.districts.filter(item => item.content.toLowerCase().includes(filter));

			if (event.srcElement.value === '') {
				this.destinationDistrict = '';
			}
		}
	}

	onSelectedFloor(event) {
		if (event.length === 0) {
			this.destinationFloorInvalid = true;
			return;
		}
		this.destinationFloorInvalid = false;
	}

	destinationFloorChange(event) {
		this.destinationFloorInvalid = false;
		if (event.srcElement.value === '') {
			this.destinationFloorInvalid = true;
		}
	}

	purposeChange(event) {
		this.purposeInvalid = false;
		if (event.srcElement.value === '') {
			this.purposeInvalid = true;
		}
	}

	openModal() {
		this.modalService.create({
			component: SampleModalComponent,
			inputs: {
				type: this.type
			}
		});
	}

	submitTravelRequest() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;

		if (this.originValue.selected) {
			this.originValue = this.originValue.content;
		}

		if (this.originDistrict.selected) {
			this.originDistrict = this.originDistrict.content;
		}

		if (this.destinationValue.selected) {
			this.destinationValue = this.destinationValue.content;
		}

		if (this.destinationDistrict.selected) {
			this.destinationDistrict = this.destinationDistrict.content;
		}

		if (this.periodValue.selected) {
			this.periodValue = this.periodValue.content;
		}

		if (this.transportationValue.selected) {
			this.transportationValue = this.transportationValue.content;
		}

		if (this.originAddressValue === '' || this.originAddressValue === undefined) {
			this.showError('Please fill in your Origin Address');
			return;
		}

		if (this.destinationAddressValue === '' || this.destinationAddressValue === undefined) {
			this.showError('Please fill in your Destination Address');
			return;
		}

		if (this.docType === 'office' && this.destinationFloorInvalid === true) {
			this.showError('Please fill in your Destination Floor');
			return;
		}

		if (this.originDistrict === '' || this.originDistrict === 'District (Kecamatan)') {
			this.showError('Please fill in your Origin District');
			return;
		}

		if (this.destinationDistrict === '' || this.destinationDistrict === 'District (Kecamatan)') {
			this.showError('Please fill in your Destination District');
			return;
		}

		if (this.purposeValue === '' || this.purposeValue === undefined) {
			this.showError('Please fill in your visit purpose');
			return;
		}

		if (this.address === undefined || this.address === '') {
			this.toastr.error('Please allow location services to get your location to submit travel request');
			return;
		}

		if (this.destinationFloorValue.content !== undefined) {
			this.destinationFloorValue = this.destinationFloorValue.content;
		}

		const content = {
			'geoTag': {
				'coordinates': {
					'lat': this.position.coords.latitude,
					'lon': this.position.coords.longitude
				},
				'description': this.address.results[0].formatted_address
			},
			'origin': this.originValue,
			'originDetails': this.originAddressValue,
			'originLocation': this.originDistrict,
			'destination': this.destinationValue,
			'destinationDetails': this.destinationAddressValue,
			'destinationLocation': this.destinationDistrict,
			'destinationFloor': this.destinationFloorValue,
			'period': this.periodValue,
			'purpose': this.purposeValue,
			'transportation': this.transportationValue,
			'startDate': this.submitForm.value.startDate,
			'endDate': this.submitForm.value.endDate,
		};

		this.employeeService.createTravelRequest(content).subscribe(response => {
			this.type = 'success';
			this.openModal();
		},
			error => {
				buttonSubmitElement.disabled = false;
				console.log(error);
				this.showError(error.error);
				// this.toastService.error(error.error);
			});
	}

	cancelRequest() {
		const userType = localStorage.getItem('userType');
		this.router.navigate(['/dashboard'], {
			queryParams: {
				userType: userType,
			}
		});
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

	getPosition() {
		return new Promise((res, rej) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(success, error);
			} else {
				console.log('Sorry, your browser does not support HTML5 geolocation.');
			}

			function success(position) {
				res(position);
			}

			function error(error) {
				console.log(error);
			}
		});
	}

	async getCurrentPosition() {
		this.position = await this.getPosition();
	}
}
