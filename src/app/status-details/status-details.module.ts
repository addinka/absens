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
import { StatusDetailsComponent } from './status-details/status-details.component';
import { StatusDetailsRoutingModule } from './status-details-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
	declarations: [
		StatusDetailsComponent
	],
	imports: [
		StatusDetailsRoutingModule,
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

export class StatusDetailsModule { }
