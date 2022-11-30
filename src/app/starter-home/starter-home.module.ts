import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterHomeRoutingModule } from './starter-home-routing.module';
import { StarterHomeComponent } from './starter-home/starter-home.component';

@NgModule({
	declarations: [
		StarterHomeComponent
	],
	imports: [
		CommonModule,
		StarterHomeRoutingModule,
	],
	
})

export class StarterHomeModule { }
