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
	RadioModule,
	TabsModule,
	TilesModule,
	ModalModule,
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { CancelModalComponent } from './cancel-modal/cancel-modal.component';
import { CancelModalRoutingModule } from './cancel-modal-routing.module';

@NgModule({
	declarations: [
		CancelModalComponent],
	imports: [
		CancelModalRoutingModule,
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
		NumberModule,
		PlaceholderModule,
		RadioModule,
		TabsModule,
		TilesModule,
		ModalModule,
	],
	bootstrap: [ ]
})

export class CancelModalModule { }
