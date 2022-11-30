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
} from 'carbon-components-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from '@carbon/charts-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { RiskResultModalComponent } from './risk-result-modal/risk-result-modal.component';
import { RiskResultModalRoutingModule } from './risk-result-modal-routing.module';

@NgModule({
	declarations: [
		RiskResultModalComponent,
	],
	imports: [
		RiskResultModalRoutingModule,
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
		ChartsModule,
		BrowserModule
	],
	bootstrap: [ ]
})
export class RiskResultModalModule { }
