import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestOvertimeEdComponent } from './detail-request-overtime-ed/detail-request-overtime-ed.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestOvertimeEdComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestOvertimeEdRoutingModule { }
