import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'carbon-components-angular';
import { CancelModalComponent } from '../../cancel-modal/cancel-modal/cancel-modal.component';
import { HealthSafetyManagerService } from '../../core/services/health-safety-manager.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../core/services/employee.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-item-stock',
	templateUrl: './item-stock.component.html',
	styleUrls: ['./item-stock.component.scss']
})
export class ItemStockComponent implements OnInit {

	invalidLocation = false;
	invalidItem = false;

	public quantity = 0;
	public remarks = '';
	public itemInput = '';
	public index: any;
	public location: any = [
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

	public item: any = [
		{
			content: 'Mask'
		},
		{
			content: 'Hand Sanitizer'
		}
	];

	maskData = [
		{
			'group': 'Medan',
			'value': 0
		},
		{
			'group': 'Bandung',
			'value': 0
		},
		{
			'group': 'Surabaya',
			'value': 0
		},
		{
			'group': 'Jakarta',
			'value': 0
		},
	];

	sanitizerData = [
		{
			'group': 'Medan',
			'value': 0
		},
		{
			'group': 'Bandung',
			'value': 0
		},
		{
			'group': 'Surabaya',
			'value': 0
		},
		{
			'group': 'Jakarta',
			'value': 0
		},
	];

	options = {
		'axes': {
				'left': {
						'mapsTo': 'group',
						'scaleType': 'labels'
				},
				'bottom': {
						'mapsTo': 'value',
				}
		},
		'height': '250px',
		'grid': {
			'strokeColor': '#e8e8e8',
			'x': {
				'numberOfTicks': 2
			}
		},
		'tooltip': {
			'datapoint': {
				'enabled': false
			},
		}
	};

	public filteredLocation: any = this.location;
	public filteredItem: any = this.item;

	constructor(
		public modalService: ModalService,
		private hscService: HealthSafetyManagerService,
		public toastr: ToastrService,
		public employeeService: EmployeeService,
		private router: Router,
		) { }

	ngOnInit() {
		this.getUserInfo();
		this.getStockData();
	}

	showSuccess() {
		this.toastr.success('Succesfully updated Item Stock!');
	}

	showError(errorMessage) {
		if (errorMessage === '' || errorMessage === null || errorMessage === undefined) {
			errorMessage = 'An unknown error occured';
		}

		this.toastr.error(errorMessage);
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

	getStockData() {
		this.hscService.viewItemsStock()
			.subscribe(
				response => {
					this.maskData = [
						{
							'group': 'Medan',
							'value': 0
						},
						{
							'group': 'Bandung',
							'value': 0
						},
						{
							'group': 'Surabaya',
							'value': 0
						},
						{
							'group': 'Jakarta',
							'value': 0
						},
					];

					this.sanitizerData = [
						{
							'group': 'Medan',
							'value': 0
						},
						{
							'group': 'Bandung',
							'value': 0
						},
						{
							'group': 'Surabaya',
							'value': 0
						},
						{
							'group': 'Jakarta',
							'value': 0
						},
					];

					// Medan
					this.maskData[0].value = response[0].mask;
					this.sanitizerData[0].value = response[0].handSanitizer;

					// Bandung
					this.maskData[1].value = response[3].mask;
					this.sanitizerData[1].value = response[3].handSanitizer;

					// Surabaya
					this.maskData[2].value = response[1].mask;
					this.sanitizerData[2].value = response[1].handSanitizer;

					// Jakarta
					this.maskData[3].value = response[2].mask;
					this.sanitizerData[3].value = response[2].handSanitizer;
				},
				error => {
					console.log(error);
					this.showError(error.error);
			}
		);
	}

	updateItemStock() {
		let param;

		if (this.itemInput === 'Mask') {
			param = {
				'office': this.location.content,
				'type': 'mask',
				'sum': this.quantity,
				'remarks': this.remarks
			};
		} else if (this.itemInput === 'Hand Sanitizer') {
			param = {
				'office': this.location.content,
				'type': 'handSanitizer',
				'sum': this.quantity,
				'remarks': this.remarks
			};
		}

		if (this.location.length === 4) {
			this.showError('Please Choose A Location');
		} else if (this.itemInput === '') {
			this.showError('Please Choose Item Type To Update');
		} else {
			this.hscService.updateItemsStock(param)
			.subscribe(
				response => {
					console.log(response);
					this.showSuccess();
					location.reload();
				},
				error => {
					console.log(error);
					this.showError(error.error);
			});
		}
	}

	onSelectedLocation(event) {
		let selected = event.item.content;
		selected = selected.split('(')[1];
		selected = selected[0];
		console.log('Selected: ', selected);

		if (selected === 'J') {
			this.index = 3;
		} else if (selected === 'S') {
			this.index = 2;
		} else if (selected === 'B') {
			this.index = 1;
		} else if (selected === 'M') {
			this.index = 0;
		}
	}

	onSelectedItem(event) {
		const selected = event.item.content;
		this.itemInput = selected;
		console.log('Selected: ', selected);
	}

	onSearchLocation(event) {
		const filter = event.srcElement.value.toLowerCase();

		this.filteredLocation = this.location.filter(item => item.content.toLowerCase().includes(filter));

		console.log('Filtered List:', this.filteredLocation);
	}

	onSearchItem(event) {
		const filter = event.srcElement.value.toLowerCase();

		this.filteredItem = this.item.filter(item => item.content.toLowerCase().includes(filter));

		console.log('Filtered List:', this.filteredItem);
	}

	cancelModal() {
		this.modalService.create({
			component: CancelModalComponent,
			inputs: { }
		});
	}

}
