import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
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
	DatePickerInputModule,
	DatePickerModule,
	TimePickerModule,
	TimePickerSelectModule
} from 'carbon-components-angular';
import { ShiftChangeComponent } from './shift-change/shift-change.component';
import { ShiftChangeRoutingModule } from './shift-change-routing.module';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { DemoUtilsModule } from '../demo-utils/module';

export function momentAdapterFactory() {
    return adapterFactory(moment);
  };

@NgModule({
	declarations: [
		ShiftChangeComponent
	],
	imports: [
        ShiftChangeRoutingModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatInputModule,
		MatDividerModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
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
		DatePickerInputModule,
		DatePickerModule,
		TimePickerModule,
		TimePickerSelectModule,
        DemoUtilsModule,
		CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
	],
	providers: [
		ModalService,
		DatePipe
	],
})

export class ShiftChangeModule { }
