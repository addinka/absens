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
	TilesModule
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { DailySickModalComponent } from './daily-sick-modal/daily-sick-modal.component';
import { DailySickModalRoutingModule } from './daily-sick-modal-routing.module';

@NgModule({
	declarations: [DailySickModalComponent],
	imports: [
		DailySickModalRoutingModule,
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
		MatDatepickerModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatInputModule,
	],
	// entryComponents: [
	// DailySickModalComponent
	// ],
	bootstrap: [ ]
})
export class DailySickModalModule { }
