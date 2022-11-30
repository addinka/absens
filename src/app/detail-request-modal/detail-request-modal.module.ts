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
import { DetailRequestModalComponent } from './detail-request-modal/detail-request-modal.component';
import { DetailRequestModalRoutingModule } from './detail-request-modal-routing.module';

@NgModule({
	declarations: [
		DetailRequestModalComponent
	],
	imports: [
		DetailRequestModalRoutingModule,
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
})
export class DetailRequestModalModule { }
