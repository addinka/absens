import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModal } from 'carbon-components-angular';

@Component({
	selector: 'app-logout-modal',
	templateUrl: './logout-modal.component.html',
	styleUrls: ['./logout-modal.component.scss']
})

export class LogoutModalComponent extends BaseModal {

	constructor(
		private router: Router,
	) {
		super();
	}

	onClickLogout() {
		sessionStorage.clear();
		this.router.navigate(['/login']);
		localStorage.clear();
	}

}
