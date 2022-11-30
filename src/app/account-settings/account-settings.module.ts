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
	ModalService,
	ModalModule
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';

@NgModule({
	declarations: [
		AccountSettingsComponent
	],
	imports: [
		AccountSettingsRoutingModule,
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
		ModalModule,
		NumberModule,
		PlaceholderModule,
		RadioModule,
		TabsModule,
		TilesModule,
		ModalModule
	],
	entryComponents: [
	],
	providers: [
		ModalService
	]
})

export class AccountSettingsModule { }
