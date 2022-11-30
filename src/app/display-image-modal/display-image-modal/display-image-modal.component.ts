import { Component, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';

@Component({
  selector: 'app-display-image-modal',
  templateUrl: './display-image-modal.component.html',
  styleUrls: ['./display-image-modal.component.scss']
})

export class DisplayImageModalComponent extends BaseModal {
	
	imageSrc: string;

	constructor (
		protected injector: Injector
	) {
		super();
		this.imageSrc = this.injector.get('imageSrc');
	}
}
