import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VaccineApprovalComponent } from './vaccine-approval/vaccine-approval.component';

const routes: Routes = [{
	path: '',
	component: VaccineApprovalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VaccineApprovalRoutingModule { }
