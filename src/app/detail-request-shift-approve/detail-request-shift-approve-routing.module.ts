import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestShiftApproveComponent } from './detail-request-shift-approve/detail-request-shift-approve.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestShiftApproveComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestShiftApproveRoutingModule { }
