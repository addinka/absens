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
import { TodayApprovalRevokeComponent } from './today-approval/today-approval-revoke.component';
import { TodayApprovalRevokeRoutingModule } from './today-approval-revoke-routing.module';

@NgModule({
	imports: [
		TodayApprovalRevokeRoutingModule,
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
	declarations: [TodayApprovalRevokeComponent]
})
export class TodayApprovalRevokeModule { }
