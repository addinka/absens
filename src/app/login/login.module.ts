import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import {
	ButtonModule,
	CheckboxModule,
	DialogModule,
	GridModule,
	InputModule,
	ListModule,
	LoadingModule,
	PlaceholderModule,
	TabsModule,
	TilesModule,
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
	imports: [
		CommonModule,
		InformationFilledModule,
		LoginRoutingModule,
		ButtonModule,
		CheckboxModule,
		DialogModule,
		GridModule,
		InputModule,
		ListModule,
		LoadingModule,
		PlaceholderModule,
		TabsModule,
		TilesModule,
	],
	declarations: [LoginComponent]
})
export class LoginModule {

}
