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

import { DetailRequestItemApproveComponent } from './detail-request-item-approve/detail-request-item-approve.component';
import { DetailRequestItemApproveRoutingModule } from './detail-request-item-approve-routing.module';

@NgModule({
	imports: [
		DetailRequestItemApproveRoutingModule,
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
		NumberModule,
		PlaceholderModule,
		RadioModule,
		TabsModule,
        TilesModule,
        ModalModule,
    ],
    exports: [

    ],
	declarations: [DetailRequestItemApproveComponent]
})
export class DetailRequestItemApproveModule { }
