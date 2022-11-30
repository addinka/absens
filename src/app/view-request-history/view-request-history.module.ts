import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	GridModule,
	ButtonModule,
	TableModule,
	PaginationModule,
	ModalModule,
} from 'carbon-components-angular';
import { ViewRequestHistoryComponent } from './view-request-history/view-request-history.component';
import { ViewRequestHistoryRoutingModule } from './view-request-history-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
	declarations: [
		ViewRequestHistoryComponent
	],
	imports: [
		ViewRequestHistoryRoutingModule,
		CommonModule,
		GridModule,
		ButtonModule,
	    TableModule,
		PaginationModule,
		ModalModule,
		MatPaginatorModule
    ],
})

export class ViewRequestHistoryModule { }
