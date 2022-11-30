import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {
	ButtonModule,
	CheckboxModule,
	ComboBoxModule,
	DialogModule,
	GridModule,
	InputModule,
	ListModule,
	LoadingModule,
	ModalModule,
	ModalService,
	NumberModule,
	PlaceholderModule
} from 'carbon-components-angular';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ChatbotRoutingModule } from './chatbot-routing.module';

@NgModule({
	declarations: [
		ChatbotComponent
	],
	imports: [
		ChatbotRoutingModule,
		CommonModule,
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
		ModalModule,
		NumberModule,
		PlaceholderModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBd55pe5Di9_o0R4Gtp1kLjHTs4uz_EHEM'
		  })
	],
	providers: [
		ModalService,
	],
})

export class ChatbotModule { }
