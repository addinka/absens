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
	TilesModule,
	DatePickerModule,
	DatePickerInputModule
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { DailyModalComponent } from './daily-modal/daily-modal.component';
import { DailyModalRoutingModule } from './daily-modal-routing.module';

@NgModule({
	declarations: [DailyModalComponent],
	imports: [
		DailyModalRoutingModule,
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
		DatePickerModule,
		DatePickerInputModule
	],
	bootstrap: [ ]
})
export class DailyModalModule { }
