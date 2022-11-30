import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkAssignmentDetailsComponent } from './work-assignment-details/work-assignment-details.component';

const routes: Routes = [{
	path: '',
	component: WorkAssignmentDetailsComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WorkAssignmentDetailsRoutingModule { }
