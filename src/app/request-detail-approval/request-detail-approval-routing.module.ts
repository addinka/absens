import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestDetailApprovalComponent } from './request-detail-approval/request-detail-approval.component';

const routes: Routes = [{
	path: '',
	component: RequestDetailApprovalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RequestDetailApprovalRoutingModule { }
