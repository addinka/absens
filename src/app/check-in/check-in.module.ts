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
import { CheckInRoutingModule } from './check-in-routing.module';
import { CheckInComponent } from './check-in/check-in.component';

@NgModule({
	declarations: [
		CheckInComponent
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
		CheckInRoutingModule,
    ],
})

export class CheckInModule { }
