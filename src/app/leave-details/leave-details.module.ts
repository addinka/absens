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
import { MatPaginatorModule } from '@angular/material/paginator';
import { TilesModule } from 'carbon-components-angular';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { LeaveDetailsRoutingModule } from './leave-details-routing.module';

@NgModule({
	declarations: [
		LeaveDetailsComponent
	],
	imports: [
		DropdownModule,
		TilesModule,
		LeaveDetailsRoutingModule,
		CommonModule,
		GridModule,
		ButtonModule,
        TableModule,
		PaginationModule,
		ModalModule,
		MatPaginatorModule
    ],
})

export class LeaveDetailsModule { }
