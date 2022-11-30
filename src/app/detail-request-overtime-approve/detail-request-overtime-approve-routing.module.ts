import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestOvertimeApproveComponent } from './detail-request-overtime-approve/detail-request-overtime-approve.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestOvertimeApproveComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestOvertimeApproveRoutingModule { }
