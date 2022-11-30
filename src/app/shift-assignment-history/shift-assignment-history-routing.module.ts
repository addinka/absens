import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShiftAssignmentHistoryComponent } from './shift-assignment-history/shift-assignment-history.component';

const routes: Routes = [{
	path: '',
	component: ShiftAssignmentHistoryComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShiftAssignmentHistoryRoutingModule { }
