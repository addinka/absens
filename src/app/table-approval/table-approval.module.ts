import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import {
	AccordionModule,
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
	TableModule,
	RadioModule,
	TabsModule,
	TilesModule,
	ModalService,
	ModalModule,
	PaginationModule,
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { TableApprovalComponent } from './table-approval/table-approval.component';
import { TableApprovalRoutingModule } from './table-approval-routing.module';
import { MultipleRejectModule } from '../multiple-reject/multiple-reject.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
	imports: [
		TableApprovalRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AccordionModule,
		ButtonModule,
		CheckboxModule,
		ComboBoxModule,
		TableModule,
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
		PaginationModule,
		MatTabsModule,
		MatPaginatorModule,
		MultipleRejectModule
		],
		exports: [

		],
	providers: [
		ModalService
	],
	entryComponents: [
		TableApprovalComponent
	],
	declarations: [TableApprovalComponent]
})
export class TableApprovalModule { }
