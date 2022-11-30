import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestItemApproveComponent } from './detail-request-item-approve/detail-request-item-approve.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestItemApproveComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestItemApproveRoutingModule { }
