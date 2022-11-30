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

import { DetailRequestOvertimeApproveComponent } from './detail-request-overtime-approve/detail-request-overtime-approve.component';
import { DetailRequestOvertimeApproveRoutingModule } from './detail-request-overtime-approve-routing.module';

@NgModule({
	imports: [
		DetailRequestOvertimeApproveRoutingModule,
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
	declarations: [DetailRequestOvertimeApproveComponent]
})
export class DetailRequestOvertimeApproveModule { }
