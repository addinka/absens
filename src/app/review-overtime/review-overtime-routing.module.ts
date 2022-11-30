import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewOvertimeComponent } from './review-overtime/review-overtime.component';

const routes: Routes = [{
	path: '',
	component: ReviewOvertimeComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReviewOvertimeRoutingModule { }
