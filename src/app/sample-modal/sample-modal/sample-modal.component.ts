import { Component, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-sample-modal',
	templateUrl: './sample-modal.component.html',
	styleUrls: ['./sample-modal.component.scss']
})
export class SampleModalComponent extends BaseModal {
	type: string;

	constructor(
		protected injector: Injector,
		private router: Router) {
		super();
		this.type = this.injector.get('type');
	}

	navigate() {
		const userType = localStorage.getItem('userType');
		this.router.navigate(['/dashboard'], {
			queryParams: {
				userType : userType,
			}
		});
	}
}
