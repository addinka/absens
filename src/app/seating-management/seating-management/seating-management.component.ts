import { Component, OnInit } from '@angular/core';
import { ModalService } from 'carbon-components-angular';
import { CancelModalComponent } from '../../cancel-modal/cancel-modal/cancel-modal.component';
import { SiteManagerService } from '../../core/services/site-manager.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-seating-management',
	templateUrl: './seating-management.component.html',
	styleUrls: ['./seating-management.component.scss']
})
export class SeatingManagementComponent implements OnInit {

	constructor(
		public modalService: ModalService,
		private siteManagerService: SiteManagerService,
		public toastr: ToastrService,
		private router: Router,
		) { }

	ngOnInit() {
		this.getSeatingAvailability();
	}

	floorSixteenMax = 0;
	floorSeventeenMax = 0;

	getSeatingAvailability() {
		this.siteManagerService.seatingAvailability().subscribe(
			response => {
				console.log('Seating Availability', response);
				for (let i = 0; i < response.length; i++) {
					if (response[i]._id === "17") {
						this.floorSeventeenMax = Number(response[i].available) + Number(response[i].reserved);
					} else if (response[i]._id === "16") {
						this.floorSixteenMax = Number(response[i].available) + Number(response[i].reserved);
					}
				}
			},
			error => {
				console.log(error);
				this.showError(error);
			});
	}

	updateSeat() {
		let param = [
			{
				"floor" : "17",
				"available" : this.floorSeventeenMax
			},
			{
				"floor" : "16",
				"available" : this.floorSixteenMax
			}
		];
		this.siteManagerService.manageSeating(param).subscribe(
			response => {
				console.log(response);
				this.showSuccess();
			},
			error => {
				console.log(error);
				this.showError(error);
			});
	}

	showSuccess() {
		this.toastr.success('Successfully updated Seating Availability!');
	}

	showError(errorMessage) {
		if (errorMessage === '' || errorMessage === null || errorMessage === undefined) {
			errorMessage = 'An unknown error occured';
		}

		this.toastr.error(errorMessage);
	}

	cancelModal() {
		this.modalService.create({
			component: CancelModalComponent,
			inputs: { }
		});
	}
}
