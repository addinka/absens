import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	GridModule,
	ButtonModule,
	TableModule,
	PaginationModule,
	ModalModule,
} from 'carbon-components-angular';
import { VaccineApprovalComponent } from './vaccine-approval/vaccine-approval.component';
import { VaccineApprovalRoutingModule } from './vaccine-approval-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TilesModule } from 'carbon-components-angular';

@NgModule({
	declarations: [
		VaccineApprovalComponent
	],
	imports: [
		TilesModule,
		VaccineApprovalRoutingModule,
		CommonModule,
		GridModule,
		ButtonModule,
        TableModule,
		PaginationModule,
		ModalModule,
		MatPaginatorModule
    ],
})

export class VaccineApprovalModule { }
