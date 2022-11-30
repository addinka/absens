import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOvertimeRequestComponent } from './create-overtime-request/create-overtime-request.component';

const routes: Routes = [{
	path: '',
	component: CreateOvertimeRequestComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CreateOvertimeRequestRoutingModule { }
