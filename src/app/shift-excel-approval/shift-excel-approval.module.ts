import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	GridModule,
	ButtonModule,
	TableModule,
	PaginationModule,
	ModalModule,
} from 'carbon-components-angular';
import { ShiftExcelApprovalComponent } from './shift-excel-approval/shift-excel-approval.component';
import { ShiftExcelApprovalRoutingModule } from './shift-excel-approval-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DownloadModule } from '@carbon/icons-angular';

@NgModule({
	declarations: [
		ShiftExcelApprovalComponent
	],
	imports: [
		ShiftExcelApprovalRoutingModule,
		DownloadModule,
		CommonModule,
		GridModule,
		ButtonModule,
		TableModule,
		PaginationModule,
		ModalModule,
		MatPaginatorModule
	],
})

export class ShiftExcelApprovalModule { }
