import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateWorkAssignmentRequestComponent } from './create-work-assignment-request/create-work-assignment-request.component';

const routes: Routes = [{
	path: '',
	component: CreateWorkAssignmentRequestComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CreateWorkAssignmentRequestRoutingModule { }
