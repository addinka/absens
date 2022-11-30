import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShiftScheduleComponent } from './shift-schedule/shift-schedule.component';

const routes: Routes = [{
	path: '',
	component: ShiftScheduleComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShiftScheduleRoutingModule { }
