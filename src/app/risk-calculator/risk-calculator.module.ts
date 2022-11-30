
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
import { RiskCalculatorRoutingModule } from './risk-calculator.routing.module';
import { RiskCalculatorComponent } from './risk-calculator/risk-calculator.component';

@NgModule({
	declarations: [
		RiskCalculatorComponent
	],
	imports: [
		RiskCalculatorRoutingModule,
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
export class RiskCalculatorModule { }
