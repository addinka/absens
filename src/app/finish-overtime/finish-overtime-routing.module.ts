import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinishOvertimeComponent } from './finish-overtime/finish-overtime.component';

const routes: Routes = [{
	path: '',
	component: FinishOvertimeComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class FinishOvertimeRoutingModule { }
