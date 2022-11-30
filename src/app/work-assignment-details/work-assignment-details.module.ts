import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	GridModule,
	ButtonModule,
	TableModule,
	PaginationModule,
	ModalModule,
} from 'carbon-components-angular';
import { WorkAssignmentDetailsComponent } from './work-assignment-details/work-assignment-details.component';
import { WorkAssignmentDetailsRoutingModule } from './work-assignment-details-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
	declarations: [
		WorkAssignmentDetailsComponent
	],
	imports: [
		WorkAssignmentDetailsRoutingModule,
		CommonModule,
		GridModule,
		ButtonModule,
	    TableModule,
		PaginationModule,
		ModalModule,
		MatPaginatorModule
		],
})

export class WorkAssignmentDetailsModule { }
