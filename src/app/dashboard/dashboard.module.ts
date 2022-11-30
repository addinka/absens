import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	ComboBoxModule,
	DialogModule,
	InputModule,
	LoadingModule,
	NumberModule,
	PlaceholderModule,
	TabsModule,
	DatePickerInputModule,
	DatePickerModule,
	TimePickerModule,
	TimePickerSelectModule
} from 'carbon-components-angular';
import {
	AccordionModule,
	ContentSwitcherModule,
	GridModule,
	ListModule,
	TableModule,
	PaginationModule,
	ButtonModule,
	CheckboxModule,
	RadioModule,
	ModalModule,
	ModalService,
} from 'carbon-components-angular';
import { ChartsModule } from '@carbon/charts-angular';
import { TilesModule } from 'carbon-components-angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DatePipe } from '@angular/common';
import { MatDatepickerModule, MatDivider } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';

// import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
	declarations: [
		DashboardComponent
	],
	imports: [
		// AngularEditorModule,
		DashboardRoutingModule,
		TilesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AccordionModule,
		ContentSwitcherModule,
		GridModule,
		ListModule,
		TableModule,
		PaginationModule,
		ButtonModule,
		CheckboxModule,
		RadioModule,
		ChartsModule,
		ModalModule,
		MatTabsModule,
		MatPaginatorModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatListModule,
		MatDividerModule,
		MatProgressSpinnerModule,
		MatInputModule,
		ComboBoxModule,
		DialogModule,
		InputModule,
		LoadingModule,
		NumberModule,
		PlaceholderModule,
		TabsModule,
		DatePickerInputModule,
		DatePickerModule,
		TimePickerModule,
		TimePickerSelectModule
	],
	providers: [
		ModalService,
		DatePipe
	],
})

export class DashboardModule { }
