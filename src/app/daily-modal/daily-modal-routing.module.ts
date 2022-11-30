import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyModalComponent } from './daily-modal/daily-modal.component';

const routes: Routes = [{
	path: '',
	component: DailyModalComponent
}];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DailyModalRoutingModule { }
