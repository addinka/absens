import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateHealthRequestComponent } from './create-health-request/create-health-request.component';

const routes: Routes = [{
	path: '',
	component: CreateHealthRequestComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CreateHealthRequestRoutingModule { }
