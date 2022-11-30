import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyCheckupComponent } from './daily-checkup/daily-checkup.component';

const routes: Routes = [{
		path: '',
		component: DailyCheckupComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DailyCheckupRoutingModule { }
