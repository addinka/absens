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
    ModalService,
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { RequestDetailApprovalComponent } from './request-detail-approval/request-detail-approval.component';
import { RequestDetailApprovalRoutingModule } from './request-detail-approval-routing.module';

@NgModule({
	imports: [
		RequestDetailApprovalRoutingModule,
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
    providers: [
		ModalService
	],
	entryComponents: [
		RequestDetailApprovalComponent
	],
    declarations: [RequestDetailApprovalComponent]
})
export class RequestDetailApprovalModule { }
