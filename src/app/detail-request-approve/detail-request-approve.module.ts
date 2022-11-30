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

import { DetailRequestApproveComponent } from './detail-request-approve/detail-request-approve.component';
import { DetailRequestApproveRoutingModule } from './detail-request-approve-routing.module';

@NgModule({
	imports: [
		DetailRequestApproveRoutingModule,
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
	declarations: [DetailRequestApproveComponent]
})
export class DetailRequestApproveModule { }
