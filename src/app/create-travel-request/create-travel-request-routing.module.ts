import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTravelRequestComponent } from './create-travel-request/create-travel-request.component';

const routes: Routes = [{
		path: '',
		component: CreateTravelRequestComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CreateTravelRequestRoutingModule { }
