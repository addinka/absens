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
	RadioModule,
	TabsModule,
    TilesModule,
    ModalModule,
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { DetailRequestItemRoutingModule } from './detail-request-item-routing.module';
import { DetailRequestItemComponent } from './detail-request-item/detail-request-item.component';

@NgModule({
	declarations: [
		DetailRequestItemComponent
	],
	imports: [
		DetailRequestItemRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		CheckboxModule,
		ComboBoxModule,
		DialogModule,
		GridModule,
		InformationFilledModule,
		InputModule,
		ListModule,
		LoadingModule,
		NumberModule,
		PlaceholderModule,
		RadioModule,
		TabsModule,
        TilesModule,
        ModalModule,
	],
})
export class DetailRequestItemModule { }
