
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
	ModalService,
	NumberModule,
	PlaceholderModule,
	RadioModule,
	TabsModule,
	TilesModule
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { DailyCheckupComponent } from './daily-checkup/daily-checkup.component';
import { DailyCheckupRoutingModule } from './daily-checkup.routing.module';

@NgModule({
	declarations: [
		DailyCheckupComponent
	],
	imports: [
		DailyCheckupRoutingModule,
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
		TilesModule
	],
	providers: [
		ModalService
	],
	bootstrap: [ ]
})
export class DailyCheckupModule { }
