
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
	ModalService,
	NumberModule,
	PlaceholderModule,
	RadioModule,
	TabsModule,
	TilesModule,
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { CancelModalModule } from '../cancel-modal/cancel-modal.module';
import { SampleModalModule } from '../sample-modal/sample-modal.module';
import { CreateTravelRequestComponent } from './create-travel-request/create-travel-request.component';
import { CreateTravelRequestRoutingModule } from './create-travel-request-routing.module';

@NgModule({
	declarations: [
		CreateTravelRequestComponent
	],
	imports: [
		CreateTravelRequestRoutingModule,
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
	entryComponents: [
	],
	providers: [
		ModalService
	],
	bootstrap: [ ]
})
export class CreateTravelRequestModule { }
