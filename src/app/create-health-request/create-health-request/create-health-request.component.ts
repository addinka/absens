import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from 'carbon-components-angular';
import { CancelModalComponent } from '../../cancel-modal/cancel-modal/cancel-modal.component';
import { EmployeeService } from '../../core/services/employee.service';
import { UtilsService } from '../../core/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SampleModalComponent } from '../../sample-modal/sample-modal/sample-modal.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
	selector: 'app-create-health-request',
	templateUrl: './create-health-request.component.html',
	styleUrls: ['./create-health-request.component.scss']
})
export class CreateHealthRequestComponent implements OnInit {

	public itemType: string;
	public pickupPoint: string;
	invalidPickupPoint = false;

	public pickupHour: string = undefined;
	invalidPickupHour = false;

	public pickupMinute: string = undefined;
	invalidPickupMinute = false;

	public pickupDetails: string;
	public pickupTime: any;
	public quantity = 0;
	invalidPickupTime = false;
	public pickUpLain: any;
	pickupDate: any = new Date();
	remarks: any;

	submitForm: FormGroup;
	public pickup: any = [
		{
			content: 'Office The Plaza (Jakarta)'
		},
		{
			content: 'Office Sinarmas Land Plaza (Surabaya)'
		},
		{
			content: 'Office Wisma HSBC (Bandung)'
		},
		{
			content: 'Office B&G Tower (Medan)'
		}
	];

	public filteredPickup: any = this.pickup;
	public model: any;
	public checked = true;
	public type: any;

	constructor (
		public modalService: ModalService,
		public employeeService: EmployeeService,
		public utilsService: UtilsService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		public toastr: ToastrService

	) { }

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			this.itemType = params.itemType;
			this.getUserInfo();
		});

		this.submitForm = this.fb.group({
			pickupDate: [new Date(), Validators.required],
			remarks: ['', Validators.required],
			});
	}

	hourChanged(event) {
		this.pickupHour = event;
	}

	minuteChanged(event) {
		this.pickupMinute = event;
	}

	getUserInfo() {
		this.employeeService.getUserDashboard()
			.subscribe(
				response => {
					console.log(response);
					if (response.isNew === 'Y') {
						this.router.navigate(['/account']);
						this.toastr.error('You have to fill your account information before anything');
						this.employeeService.headerStatusTrueEmitter().emit();
					} else if (response.isChecked === 'N') {
						this.router.navigate(['/daily-checkup']);
						this.toastr.error('You have to do your daily checkup before doing anything for today');
						this.employeeService.headerStatusTrueEmitter().emit();
					}
				},
				error => {
					this.toastr.error(error.error);
				});
	}

	addpickupDate(events: MatDatepickerInputEvent<Date>) {
		this.pickupDate = new Date(events.value);
	}

	onChecked(event) {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));

		if (event.checked === true) {
			buttonSubmitElement.disabled = false;

		} else {
			buttonSubmitElement.disabled = true;
		}
	}

	onSelectedPickup(event) {
		if (event.length === 0) {
			this.invalidPickupPoint = true;
			return;
		}
		this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidPickupPoint = false;
		console.log('Selected: ', selected);

		this.utilsService.searchDestination(
			selected,
			'office'
		)
		.subscribe(
			response => {
			console.log(response);
			this.pickupDetails = response[0].address;
		},
			error => {
			console.log(error);
		});
	}

	onSearchPickup(event) {
		this.invalidPickupPoint = true;
		const filter = event.srcElement.value.toLowerCase();

		this.filteredPickup = this.pickup.filter(item => item.content.toLowerCase().includes(filter));

		const newInput = {
			'content': 'Other: ' + event.srcElement.value
		};

		if (event.srcElement.value !== '' && this.filteredPickup.length === 0) {
			this.filteredPickup.push(newInput);
		}

		if (event.srcElement.value === '') {
			this.pickupPoint = '';
		}

		console.log('Filtered List:', this.filteredPickup);
	}

	cancelModal() {
		this.modalService.create({
			component: CancelModalComponent,
			inputs: { }
		});
	}

	openSampleModal() {
		this.modalService.create({
			component: SampleModalComponent,
			inputs: {
				type: this.type
			}
		});
	}

	reqItems() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		const nowDate = new Date();
		if (this.pickupHour === undefined || this.pickupMinute === undefined) {
			this.toastr.error('Please enter the correct time', 'Invalid Time');
		} else if (this.pickUpLain === undefined) {
			this.toastr.error('Please enter a pickup point', 'Invalid Pickup Point');
		} else if (this.quantity <= 0){
			this.toastr.error('Please enter a quantity more than 0', 'Invalid Quantity');
		} else if (this.remarks === "" || this.remarks === null || this.remarks === undefined){
			this.toastr.error('Remark is mandatory', 'Invalid Remarks');
		} else {
			const currDate = new Date(this.pickupDate);
			currDate.setHours(parseInt(this.pickupHour), parseInt(this.pickupMinute));
			console.log(currDate);
			if (currDate < nowDate) {
				this.toastr.error('Pickup Date/Time cannot be in the past.', 'Invalid Pickup Date/Time');
			} else {
				console.log(currDate);
				buttonSubmitElement.disabled = true;
				this.employeeService.requestItems({
					'itemType': this.itemType,
					'pickupPoint': this.pickUpLain,
					'pickupDetails': this.pickupDetails,
					'pickupTime': currDate,
					'quantity': this.quantity,
					'remarks': this.remarks
				})
					.subscribe(
						response => {
							console.log(response);
							this.type = 'itemRequest';
							this.openSampleModal();
						},
						error => {
							buttonSubmitElement.disabled = false;
							console.log(error);
							if (error.error === '' || error.error === null || error.error === undefined) {
								this.toastr.error('An unknown error occured');
							} else {
								this.toastr.error(error.error);
							}
						});
			}
		}
	}
}
