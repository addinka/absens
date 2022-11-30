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
import { ItemStockComponent } from './item-stock/item-stock.component';
import { ItemStockRoutingModule } from './item-stock-routing.module';
import { ChartsModule } from '@carbon/charts-angular';

@NgModule({
	declarations: [
		ItemStockComponent
	],
	imports: [
		CommonModule,
		ItemStockRoutingModule,
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
export class ItemStockModule { }
