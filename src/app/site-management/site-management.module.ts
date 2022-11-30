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
import { SiteManagementComponent } from './site-management/site-management.component';
import { SiteManagementRoutingModule } from './site-management-routing.module';
import { ChartsModule } from '@carbon/charts-angular';

@NgModule({
	declarations: [
		SiteManagementComponent
	],
	imports: [
		CommonModule,
		SiteManagementRoutingModule,
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
		TilesModule
	],
	providers: []
})
export class SiteManagementModule { }
