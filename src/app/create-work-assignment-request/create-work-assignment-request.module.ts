import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
import { CreateWorkAssignmentRequestComponent } from './create-work-assignment-request/create-work-assignment-request.component';
import { CreateWorkAssignmentRequestRoutingModule } from './create-work-assignment-request-routing.module';

@NgModule({
	declarations: [
		CreateWorkAssignmentRequestComponent
	],
	imports: [
		CreateWorkAssignmentRequestRoutingModule,
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
	],
	providers: [
		ModalService,
		DatePipe
	],
})

export class CreateWorkAssignmentRequestModule { }
