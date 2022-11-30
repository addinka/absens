import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewLeaveComponent } from './review-leave/review-leave.component';

const routes: Routes = [{
	path: '',
	component: ReviewLeaveComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReviewLeaveRoutingModule { }
