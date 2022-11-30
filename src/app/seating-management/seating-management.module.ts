import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	ButtonModule,
	CheckboxModule,
	ComboBoxModule,
	DialogModule,
	GridModule,
	InputModule,
	ListModule,
	LoadingModule,
	NumberModule,
	PlaceholderModule,
	TabsModule,
	TilesModule
} from 'carbon-components-angular';
import { SeatingManagementComponent } from './seating-management/seating-management.component';
import { SeatingManagementRoutingModule } from './seating-management-routing.module';
import { ChartsModule } from '@carbon/charts-angular';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
	declarations: [
		SeatingManagementComponent
	],
	imports: [
		CommonModule,
		SeatingManagementRoutingModule,
		ChartsModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		CheckboxModule,
		ComboBoxModule,
		DialogModule,
		GridModule,
		InputModule,
		ListModule,
		LoadingModule,
		NumberModule,
		PlaceholderModule,
		TabsModule,
		TilesModule,
		MatSliderModule
	],
	providers: []
})
export class SeatingManagementModule { }
