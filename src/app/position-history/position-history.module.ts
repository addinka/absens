import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	DropdownModule,
	GridModule,
	ButtonModule,
	TableModule,
	PaginationModule,
	ModalModule,
} from 'carbon-components-angular';
import { PositionHistoryComponent } from './position-history/position-history.component';
import { PositiontHistoryRoutingModule } from './position-history-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
	declarations: [
		PositionHistoryComponent
	],
	imports: [
		PositiontHistoryRoutingModule,
		CommonModule,
		DropdownModule,
		GridModule,
		ButtonModule,
	    TableModule,
		PaginationModule,
		ModalModule,
		MatPaginatorModule
    ],
})

export class PositionHistoryModule { }
