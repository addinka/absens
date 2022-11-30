import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUpdateShiftComponent } from './create-update-shift/create-update-shift.component';

const routes: Routes = [{
	path: '',
	component: CreateUpdateShiftComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CreateUpdateShiftRoutingModule { }
