import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	GridModule,
	ButtonModule,
	TableModule,
	PaginationModule,
	ModalModule,
} from 'carbon-components-angular';
import { ShiftAssignmentHistoryComponent } from './shift-assignment-history/shift-assignment-history.component';
import { ShiftAssignmentHistoryRoutingModule } from './shift-assignment-history-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
	declarations: [
		ShiftAssignmentHistoryComponent
	],
	imports: [
		ShiftAssignmentHistoryRoutingModule,
		CommonModule,
		GridModule,
		ButtonModule,
	    TableModule,
		PaginationModule,
		ModalModule,
		MatPaginatorModule
    ],
})

export class ShiftAssignmentHistoryModule { }
