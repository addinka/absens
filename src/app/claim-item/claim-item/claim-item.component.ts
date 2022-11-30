import { Component, Injector } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { BaseModal } from 'carbon-components-angular';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'app-claim-item',
	templateUrl: './claim-item.component.html',
	styleUrls: ['./claim-item.component.scss']
})
export class ClaimItemComponent extends BaseModal {

	_id: string;

	constructor (
		protected injector: Injector,
		public employeeService: EmployeeService,
		public toastr: ToastrService
	) {
		super();
		this._id = this.injector.get('_id');
	}

	showError(errorMessage) {
		if (errorMessage === '' || errorMessage === null || errorMessage === undefined) {
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	claimingItem() {
		this.employeeService.claimItem({
			'_id': this._id
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
