import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShiftExcelApprovalComponent } from './shift-excel-approval/shift-excel-approval.component';

const routes: Routes = [{
	path: '',
	component: ShiftExcelApprovalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShiftExcelApprovalRoutingModule { }
