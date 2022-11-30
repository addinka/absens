import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultipleRejectComponent } from './multiple-reject/multiple-reject.component';

const routes: Routes = [{
	path: '',
	component: MultipleRejectComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MultipleRejectRoutingModule { }
