import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestLeaveComponent } from './detail-request-leave/detail-request-leave.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestLeaveComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestLeaveRoutingModule { }
