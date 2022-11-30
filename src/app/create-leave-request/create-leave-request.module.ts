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
import { CreateLeaveRequestComponent } from './create-leave-request/create-leave-request.component';
import { CreateLeaveRequestRoutingModule } from './create-leave-request-routing.module';

@NgModule({
	declarations: [
		CreateLeaveRequestComponent
	],
	imports: [
		CreateLeaveRequestRoutingModule,
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

export class CreateLeaveRequestModule { }
