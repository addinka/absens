import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewShiftComponent } from './review-shift/review-shift.component';

const routes: Routes = [{
	path: '',
	component: ReviewShiftComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReviewShiftRoutingModule { }
