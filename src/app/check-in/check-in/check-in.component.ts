import { Component, Injector } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { BaseModal } from 'carbon-components-angular';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../core/services/utils.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})

export class CheckInComponent extends BaseModal {
	status: string;
	_id: string;
	requestDate: any;
	isCheckingOut: boolean = false;
	isOvertime: boolean = false;
	checkboxCheck = false;
	isCheckOutLoading = false;

	public pickupHour: string;
	invalidPickupHour = false;

	public pickupMinute: string;
	invalidPickupMinute = false;

	// declare NgModel values
	checkTime: any;
	overtimeReasonValue: string;
	checkInTime: any;

	position: any;
	latitude: any;
	longitude: any;
	address: any;
	googleAPIKey = 'AIzaSyBd55pe5Di9_o0R4Gtp1kLjHTs4uz_EHEM';

	public hour: any = [
		{
			content: '00'
		},
		{
			content: '01'
		},
		{
			content: '02'
		},
		{
			content: '03'
		},
		{
			content: '04'
		},
		{
			content: '05'
		},
		{
			content: '06'
		},
		{
			content: '07'
		},
		{
			content: '08'
		},
		{
			content: '09'
		},
		{
			content: '10'
		},
		{
			content: '11'
		},
		{
			content: '12'
		},
		{
			content: '13'
		},
		{
			content: '14'
		},
		{
			content: '15'
		},
		{
			content: '16'
		},
		{
			content: '17'
		},
		{
			content: '18'
		},
		{
			content: '19'
		},
		{
			content: '20'
		},
		{
			content: '21'
		},
		{
			content: '22'
		},
		{
			content: '23'
		},
	];

	public minute: any = [
		{
			content: '00'
		},
		{
			content: '01'
		},
		{
			content: '02'
		},
		{
			content: '03'
		},
		{
			content: '04'
		},
		{
			content: '05'
		},
		{
			content: '06'
		},
		{
			content: '07'
		},
		{
			content: '08'
		},
		{
			content: '09'
		},
		{
			content: '10'
		},
		{
			content: '11'
		},
		{
			content: '12'
		},
		{
			content: '13'
		},
		{
			content: '14'
		},
		{
			content: '15'
		},
		{
			content: '16'
		},
		{
			content: '17'
		},
		{
			content: '18'
		},
		{
			content: '19'
		},
		{
			content: '20'
		},
		{
			content: '21'
		},
		{
			content: '22'
		},
		{
			content: '23'
		},
		{
			content: '24'
		},
		{
			content: '25'
		},
		{
			content: '26'
		},
		{
			content: '27'
		},
		{
			content: '28'
		},
		{
			content: '29'
		},
		{
			content: '30'
		},
		{
			content: '31'
		},
		{
			content: '32'
		},
		{
			content: '33'
		},
		{
			content: '34'
		},
		{
			content: '35'
		},
		{
			content: '36'
		},
		{
			content: '37'
		},
		{
			content: '38'
		},
		{
			content: '39'
		},
		{
			content: '40'
		},
		{
			content: '41'
		},
		{
			content: '42'
		},
		{
			content: '43'
		},
		{
			content: '44'
		},
		{
			content: '45'
		},
		{
			content: '46'
		},
		{
			content: '47'
		},
		{
			content: '48'
		},
		{
			content: '49'
		},
		{
			content: '50'
		},
		{
			content: '51'
		},
		{
			content: '52'
		},
		{
			content: '53'
		},
		{
			content: '54'
		},
		{
			content: '55'
		},
		{
			content: '56'
		},
		{
			content: '57'
		},
		{
			content: '58'
		},
		{
			content: '59'
		},
	];

	constructor (
		protected injector: Injector,
		public employeeService: EmployeeService,
		public toastr: ToastrService,
		public utilsService: UtilsService,
	) {
		super();
		this.status = this.injector.get('status');
		this._id = this.injector.get('_id');
		this.requestDate = this.injector.get('requestDate');
		this.checkInTime = this.injector.get('checkInTime');
	}

	async ngOnInit() {
		if (this.status === 'CHECKED-IN') {
			this.isCheckingOut = true;
		}
		this.getReservation();
		await this.getCurrentPosition();
		this.address = await this.utilsService.getAddress(this.position.coords.latitude, this.position.coords.longitude);
	}

	reservationId = null;

	getReservation() {
		this.employeeService.getReservationDetail().subscribe(
			response => {
				console.log('dot', response);
				this.reservationId = response._id;
			});
	}

	showError(errorMessage) {
		if(errorMessage === '' || errorMessage === null || errorMessage === undefined){
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	onKeyUp(event) {
		if (this.checkTime.startsWith('0') || this.checkTime.startsWith('1') || this.checkTime.startsWith('2')) {
			if (this.checkTime.charAt(0) === '2' && this.checkTime.length > 1) {
				if (this.checkTime.charAt(1) === '0' ||
					this.checkTime.charAt(1) === '1' ||
					this.checkTime.charAt(1) === '2' ||
					this.checkTime.charAt(1) === '3') {
					if (this.checkTime.length === 2) {
						this.checkTime = this.checkTime + ':';
					} else if (this.checkTime.length === 4) {
						if (this.checkTime.charAt(3) === '0' ||
							this.checkTime.charAt(3) === '1' ||
							this.checkTime.charAt(3) === '2' ||
							this.checkTime.charAt(3) === '3' ||
							this.checkTime.charAt(3) === '4' ||
							this.checkTime.charAt(3) === '5') {
						} else {
							this.checkTime = this.checkTime.slice(0, -1);
						}
					} else if (this.checkTime.length === 5) {
						if (this.checkTime.charAt(4) === '0' ||
							this.checkTime.charAt(4) === '1' ||
							this.checkTime.charAt(4) === '2' ||
							this.checkTime.charAt(4) === '3' ||
							this.checkTime.charAt(4) === '4' ||
							this.checkTime.charAt(4) === '5' ||
							this.checkTime.charAt(4) === '6' ||
							this.checkTime.charAt(4) === '7' ||
							this.checkTime.charAt(4) === '8' ||
							this.checkTime.charAt(4) === '9') {
						} else {
							this.checkTime = this.checkTime.slice(0, -1);
						}
					} else if (this.checkTime.length > 5) {
						this.checkTime = this.checkTime.slice(0, -1);
					}
				} else {
					this.checkTime = this.checkTime.slice(0, -1);
				}
			} else if ((this.checkTime.charAt(0) === '1' && this.checkTime.length > 1) ||
						(this.checkTime.charAt(0) === '0' && this.checkTime.length > 1)) {
				if (this.checkTime.charAt(1) === '0' ||
					this.checkTime.charAt(1) === '1' ||
					this.checkTime.charAt(1) === '2' ||
					this.checkTime.charAt(1) === '3' ||
					this.checkTime.charAt(1) === '4' ||
					this.checkTime.charAt(1) === '5' ||
					this.checkTime.charAt(1) === '6' ||
					this.checkTime.charAt(1) === '7' ||
					this.checkTime.charAt(1) === '8' ||
					this.checkTime.charAt(1) === '9') {
					if (this.checkTime.length === 2) {
						this.checkTime = this.checkTime + ':';
					} else if (this.checkTime.length === 4) {
						if (this.checkTime.charAt(3) === '0' ||
							this.checkTime.charAt(3) === '1' ||
							this.checkTime.charAt(3) === '2' ||
							this.checkTime.charAt(3) === '3' ||
							this.checkTime.charAt(3) === '4' ||
							this.checkTime.charAt(3) === '5') {
						} else {
							this.checkTime = this.checkTime.slice(0, -1);
						}
					} else if (this.checkTime.length === 5) {
						if (this.checkTime.charAt(4) === '0' ||
							this.checkTime.charAt(4) === '1' ||
							this.checkTime.charAt(4) === '2' ||
							this.checkTime.charAt(4) === '3' ||
							this.checkTime.charAt(4) === '4' ||
							this.checkTime.charAt(4) === '5' ||
							this.checkTime.charAt(4) === '6' ||
							this.checkTime.charAt(4) === '7' ||
							this.checkTime.charAt(4) === '8' ||
							this.checkTime.charAt(4) === '9') {
						} else {
							this.checkTime = this.checkTime.slice(0, -1);
						}
					} else if (this.checkTime.length > 5) {
						this.checkTime = this.checkTime.slice(0, -1);
					}
				} else {
					this.checkTime = this.checkTime.slice(0, -1);
				}
			}
		} else {
			this.checkTime = this.checkTime.slice(0, -1);
		}
	}

	onSelectedHour(event) {
		if (event.length === 0) {
			this.invalidPickupHour = true;
			return;
		}
		const selected = event.item.content;
		this.invalidPickupHour = false;
		console.log('Selected: ', selected);
		this.pickupHour = selected;
		this.timePickerChange();
	}

	onSelectedMinute(event) {
		if (event.length === 0) {
			this.invalidPickupMinute = true;
			return;
		}
		const selected = event.item.content;
		this.invalidPickupMinute = false;
		console.log('Selected: ', selected);
		this.pickupMinute = selected;
		this.timePickerChange();
	}

	timePickerChange() {
		let checkInTime = new Date(this.checkInTime);
		checkInTime.setSeconds(0);
		let currDate = new Date();
		let timeDifference;
		if (this.pickupMinute !== undefined && this.pickupHour !== undefined){
			let currHour = parseInt(this.pickupHour);
			let currMinute = parseInt(this.pickupMinute);
			currDate.setHours(currHour, currMinute, 0);
			timeDifference = Math.round((currDate.getTime()-checkInTime.getTime()) / 60000);
			if (timeDifference >= 540) {
				this.isOvertime = true;
			} else {
				this.isOvertime = false;
			}
		}
	}
  
	checkingIn() {
		if (this.pickupHour === undefined || this.pickupMinute === undefined) {
			this.showError('Please insert a correct time');
		} else if (this.address === undefined || this.address === '') {
			this.toastr.error('Please allow location services to get your location to submit travel request');
		} else {
			const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
			buttonSubmitElement.disabled = true;
			const requestDate = new Date(this.requestDate);
			requestDate.setHours(parseInt(this.pickupHour), parseInt(this.pickupMinute), 0);
			this.employeeService.checkIn({
				'geoTag': {
					'coordinates': {
						'lat': this.position.coords.latitude,
						'lon': this.position.coords.longitude
					},
					'description': this.address.results[0].formatted_address
				},
				'_id': this._id,
				'checkInTime': requestDate
			})
			.subscribe(
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

	checkingOut() {
		if (this.pickupHour === undefined || this.pickupMinute === undefined) {
			this.showError('Please insert a correct time');
		} else if (this.address === undefined || this.address === '') {
			this.toastr.error('Please allow location services to get your location to submit travel request');
		} else {
			const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
			buttonSubmitElement.disabled = true;
			let requestDate = new Date(this.requestDate);
			requestDate.setHours(parseInt(this.pickupHour), parseInt(this.pickupMinute), 0);
			this.isCheckOutLoading =  true;
			this.employeeService.checkOut({
				'geoTag': {
					'coordinates': {
						'lat': this.position.coords.latitude,
						'lon': this.position.coords.longitude
					},
					'description': this.address.results[0].formatted_address
				},
				'_id': this._id,
				'checkOutTime': requestDate,
				'overtimeReason': this.overtimeReasonValue
			})
			.subscribe(
				response => {
				console.log(response);
				this.releaseSeat();
			},
				error => {
				console.log(error);
				this.showError(error.error);
			});
		}
	}

	releaseSeat() {
		if (this.reservationId !== null) {
			let body = {
				"reservationID": this.reservationId
			}
	
			this.employeeService.releaseReservation(body).subscribe(
				response => {
					console.log(response);
					this.reservationId = null;
					location.reload();
				},
				error => {
					console.log(error);
					this.showError(error.error);
				});
		} else {
			location.reload();
		}
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