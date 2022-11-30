import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableApprovalComponent } from './table-approval/table-approval.component';

const routes: Routes = [{
	path: '',
	component: TableApprovalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TableApprovalRoutingModule { }
