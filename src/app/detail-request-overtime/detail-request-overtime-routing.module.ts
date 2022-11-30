import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestOvertimeComponent } from './detail-request-overtime/detail-request-overtime.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestOvertimeComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestOvertimeRoutingModule { }
