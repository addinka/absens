
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
	SliderModule,
	TabsModule,
	TilesModule
} from 'carbon-components-angular';

import { MatSliderModule } from '@angular/material/slider';
import { InformationFilledModule } from '@carbon/icons-angular';
import { SurveyPageRoutingModule } from './survey-page.routing.module';
import { SurveyPageComponent } from './survey-page/survey-page.component';

@NgModule({
	declarations: [
		SurveyPageComponent
	],
	imports: [
		SurveyPageRoutingModule,
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
		MatSliderModule,
		ModalModule,
		NumberModule,
		PlaceholderModule,
		RadioModule,
		SliderModule,
		TabsModule,
		TilesModule
	],
	providers: [
		ModalService
	],
	bootstrap: [ ]
})
export class SurveyPageModule { }
