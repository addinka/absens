import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, ModalModule } from 'carbon-components-angular';
import { DisplayImageModalRoutingModule } from './display-image-modal-routing.module';
import { DisplayImageModalComponent } from './display-image-modal/display-image-modal.component';

@NgModule({
	declarations: [
		DisplayImageModalComponent
	],
	imports: [
		CommonModule,
		GridModule,
		ModalModule,
		DisplayImageModalRoutingModule,
    ],
})

export class DisplayImageModalModule { }
