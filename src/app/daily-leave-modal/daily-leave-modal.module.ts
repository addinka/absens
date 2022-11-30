import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
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
import { DailyLeaveModalRoutingModule } from './daily-leave-modal-routing.module';
import { DailyLeaveModalComponent } from './daily-leave-modal/daily-leave-modal.component';

@NgModule({
	declarations: [DailyLeaveModalComponent],
	imports: [
		DailyLeaveModalRoutingModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatInputModule,
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
export class DailyLeaveModalModule { }
