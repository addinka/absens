
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	ButtonModule,
	CheckboxModule,
	ComboBoxModule,
	DialogModule,
	GridModule,
	InputModule,
	ListModule,
	LoadingModule,
	ModalModule,
	NumberModule,
	PlaceholderModule,
	RadioModule,
	TabsModule,
	TilesModule
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';

import { SampleModalComponent } from './sample-modal/sample-modal.component';
import { SampleModalRoutingModule } from './sample-modal.routing.module';

@NgModule({
	declarations: [
		SampleModalComponent
	],
	imports: [
		SampleModalRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		CheckboxModule,
		ComboBoxModule,
		DialogModule,
		GridModule,
		InformationFilledModule,
		InputModule,
		ListModule,
		LoadingModule,
		ModalModule,
		NumberModule,
		PlaceholderModule,
		RadioModule,
		TabsModule,
		TilesModule,
	],
	bootstrap: [ ]
})
export class SampleModalModule { }
