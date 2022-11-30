import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
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
import { MiniGameComponent } from './mini-game/mini-game.component';
import { MiniGameRoutingModule } from './mini-game-routing.module';

@NgModule({
	declarations: [
		MiniGameComponent
	],
	imports: [
		MiniGameRoutingModule,
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
		MatProgressSpinnerModule,
		MatTabsModule
	],
	providers: [
		ModalService,
		DatePipe
	],
})

export class MiniGameModule { }
