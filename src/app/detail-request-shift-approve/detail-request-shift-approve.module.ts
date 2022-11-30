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

import { DetailRequestShiftApproveComponent } from './detail-request-shift-approve/detail-request-shift-approve.component';
import { DetailRequestShiftApproveRoutingModule } from './detail-request-shift-approve-routing.module';

@NgModule({
	imports: [
		DetailRequestShiftApproveRoutingModule,
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
	declarations: [DetailRequestShiftApproveComponent]
})
export class DetailRequestShiftApproveModule { }
