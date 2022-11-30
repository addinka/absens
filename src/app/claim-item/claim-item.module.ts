import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	ButtonModule,
	CheckboxModule,
	DialogModule,
	GridModule,
	InputModule,
	ListModule,
	LoadingModule,
	NumberModule,
	PlaceholderModule,
    ModalModule,
} from 'carbon-components-angular';
import { ClaimItemRoutingModule } from './claim-item-routing.module';
import { ClaimItemComponent } from './claim-item/claim-item.component';

@NgModule({
	declarations: [
		ClaimItemComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		CheckboxModule,
		DialogModule,
		GridModule,
		InputModule,
		ListModule,
		LoadingModule,
		NumberModule,
		PlaceholderModule,
		ModalModule,
		ClaimItemRoutingModule,
    ],
})

export class ClaimItemModule { }
