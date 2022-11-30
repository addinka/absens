
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

import { DetailRequestOvertimeEdComponent } from './detail-request-overtime-ed/detail-request-overtime-ed.component';
import { DetailRequestOvertimeEdRoutingModule } from './detail-request-overtime-ed-routing.module';

@NgModule({
	imports: [
		DetailRequestOvertimeEdRoutingModule,
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
		exports: [

		],
	declarations: [DetailRequestOvertimeEdComponent]
})
export class DetailRequestOvertimeEDModule { }
