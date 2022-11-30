import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShiftChangeComponent } from './shift-change/shift-change.component';

const routes: Routes = [{
	path: '',
	component: ShiftChangeComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShiftChangeRoutingModule { }
