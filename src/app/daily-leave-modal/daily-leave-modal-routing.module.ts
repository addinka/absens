import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyLeaveModalComponent } from './daily-leave-modal/daily-leave-modal.component';


const routes: Routes = [{
	path: '',
	component: DailyLeaveModalComponent
}];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DailyLeaveModalRoutingModule {}
