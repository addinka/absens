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
	NumberModule,
	PlaceholderModule,
	RadioModule,
	TabsModule,
		TilesModule,
		ModalModule,
		ModalService,
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { MultipleRejectComponent } from './multiple-reject/multiple-reject.component';
import { MultipleRejectRoutingModule } from './multiple-reject-routing.module';

@NgModule({
	imports: [
		MultipleRejectRoutingModule,
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
		NumberModule,
		PlaceholderModule,
		RadioModule,
		TabsModule,
		TilesModule,
		ModalModule,
		],
		exports: [

		],
		providers: [
		ModalService
	],
	entryComponents: [
		MultipleRejectComponent
	],
		declarations: [MultipleRejectComponent]
})
export class MultipleRejectModule { }
