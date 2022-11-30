import { Component } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-cancel-modal',
	templateUrl: './cancel-modal.component.html',
	styleUrls: ['./cancel-modal.component.scss']
})

export class CancelModalComponent extends BaseModal {

	constructor( private router: Router ) { super(); }

	navigate() { this.router.navigate(['/dashboard']); }

}
