import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'carbon-components-angular';
import { CancelModalComponent } from '../../cancel-modal/cancel-modal/cancel-modal.component';
import { SiteManagerService } from '../../core/services/site-manager.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../core/services/employee.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'app-site-management',
	templateUrl: './site-management.component.html',
	styleUrls: ['./site-management.component.scss']
})
export class SiteManagementComponent implements OnInit {
	public location: any = [
		{
			content: 'Office / Client'
		}
	];

	invalidLocation = false;
	locationValue: any = 'Office/Client';
	locationUpdate = new Subject<String>();
	filteredLocation: any = this.location;
	targetValueLocation: any = '';
	statusValue: any = 'Open';

	public status: any = [
		{
			content: 'Open'
		},
		{
			content: 'Closed'
		}
	];


	constructor(
		public modalService: ModalService,
		private siteManagerService: SiteManagerService,
		public toastr: ToastrService,
		public employeeService: EmployeeService,
		private router: Router,
		) { }

	ngOnInit() {
		this.getUserInfo();
		this.locationUpdate.pipe(
			debounceTime(400),
			distinctUntilChanged())
			.subscribe(value => {
				this.onSearchLocation(value);
			});
	}

	getUserInfo() {
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
					}
				},
				error => {
					this.toastr.error(error.error);
				});
	}

	showSuccess() {
		this.toastr.success('Successfully updated Site Status!');
	}

	showError(errorMessage) {
		if (errorMessage === '' || errorMessage === null || errorMessage === undefined) {
			errorMessage = 'An unknown error occured';
		}

		this.toastr.error(errorMessage);
	}

	onSearchLocation(event) {
		this.invalidLocation = true;

		const filter = event.srcElement.value;
		if (this.targetValueLocation !== filter) {
			this.targetValueLocation = filter;
			this.searchLocation(filter);

			if (event.srcElement.value === '') {
				this.locationValue = '';
			}
		}
	}

	onSelectedLocation(event) {
		if (event.length === 0) {
			this.invalidLocation = true;

			return;
		}

		const selected = event.item.content;

		this.invalidLocation = false;
	}

	searchLocation(location?) {
		this.employeeService.searchDestination(location.toLowerCase()).pipe(debounceTime(0))
			.subscribe(
				response => {
					this.location = [];
					response.forEach(element => {
						const newDestination = {
							'content': element.name
					};

					this.location.push(newDestination);
				});
					this.filteredLocation = this.location.filter(item => item.content.toLowerCase().includes(location.toLowerCase()));
				},
				error => {
					console.log(error);
					this.showError(error.error);
				}
		);
	}

	updateSiteStatus() {
		console.log('Location Value: ', this.locationValue);
		console.log('Status Value: ', this.statusValue);
		const param = {
			'name': this.locationValue.content,
			'status': this.statusValue.content.toUpperCase()
		};

		if (this.locationValue === 'Office/Client') {
			this.showError('Please Choose A Location');
		} else {
			this.siteManagerService.updateSiteStatus(param)
			.subscribe(
				response => {
					console.log(response);
					this.showSuccess();
				},
				error => {
					console.log(error);
					this.showError(error.error);
			});
		}
	}

	cancelModal() {
		this.modalService.create({
			component: CancelModalComponent,
			inputs: { }
		});
	}
}
