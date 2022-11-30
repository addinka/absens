import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLeaveRequestComponent } from './create-leave-request/create-leave-request.component';

const routes: Routes = [{
	path: '',
	component: CreateLeaveRequestComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CreateLeaveRequestRoutingModule { }
