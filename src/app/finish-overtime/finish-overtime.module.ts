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
    ModalModule,
} from 'carbon-components-angular';
import { FinishOvertimeRoutingModule } from './finish-overtime-routing.module';
import { FinishOvertimeComponent } from './finish-overtime/finish-overtime.component';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

@NgModule({
	declarations: [
		FinishOvertimeComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		ComboBoxModule,
		CheckboxModule,
		DialogModule,
		GridModule,
		InputModule,
		ListModule,
		LoadingModule,
		NumberModule,
		PlaceholderModule,
		ModalModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatNativeDateModule,
		MatInputModule,
		FinishOvertimeRoutingModule,
	],
	providers: [
		DatePipe
	],
})

export class FinishOvertimeModule { }
