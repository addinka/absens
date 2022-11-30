import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	DropdownModule,
	GridModule,
	ButtonModule,
	TableModule,
	TilesModule,
	PaginationModule,
	ModalModule,
} from 'carbon-components-angular';
import { OvertimeDetailsComponent } from './overtime-details/overtime-details.component';
import { OvertimeDetailsRoutingModule } from './overtime-details-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
	declarations: [
		OvertimeDetailsComponent
	],
	imports: [
		OvertimeDetailsRoutingModule,
		CommonModule,
		DropdownModule,
		FormsModule,
		ReactiveFormsModule,
		GridModule,
		ButtonModule,
		TableModule,
		TilesModule,
		PaginationModule,
		ModalModule,
		MatTabsModule,
		MatPaginatorModule
    ],
})

export class OvertimeDetailsModule { }
