import { Component } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-confirmation-modal',
	templateUrl: './confirmation-modal.component.html',
	styleUrls: ['./confirmation-modal.component.scss']
})

export class ConfirmationModalComponent extends BaseModal {

	constructor( private router: Router ) { super(); }

	navigate() { this.router.navigate(['/dashboard']); }

}
