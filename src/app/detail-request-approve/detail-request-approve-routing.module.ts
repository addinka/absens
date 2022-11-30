import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestApproveComponent } from './detail-request-approve/detail-request-approve.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestApproveComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestApproveRoutingModule { }
