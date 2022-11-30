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
	ModalModule,
	NumberModule,
	PlaceholderModule,
	RadioModule,
	TabsModule,
	TilesModule,
	AccordionModule,
	FileUploaderModule
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { LogModalComponent } from './log-modal/log-modal.component';
import { LogModalRoutingModule } from './log-modal-routing.module';



@NgModule({
	declarations: [LogModalComponent],
	imports: [
		LogModalRoutingModule,
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
		AccordionModule,
		FileUploaderModule
	],
	bootstrap: [ ]
})
export class LogModalModule { }
