import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShiftAssignmentComponent } from './shift-assignment/shift-assignment.component';

const routes: Routes = [{
	path: '',
	component: ShiftAssignmentComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShiftAssignmentRoutingModule { }
