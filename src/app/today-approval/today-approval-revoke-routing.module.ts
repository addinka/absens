import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodayApprovalRevokeComponent } from './today-approval/today-approval-revoke.component';

const routes: Routes = [{
	path: '',
	component: TodayApprovalRevokeComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TodayApprovalRevokeRoutingModule { }
