import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';

const routes: Routes = [{
	path: '',
	component: LeaveDetailsComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LeaveDetailsRoutingModule { }
