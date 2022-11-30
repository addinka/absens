import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionHistoryComponent } from './position-history/position-history.component';

const routes: Routes = [{
	path: '',
	component: PositionHistoryComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class PositiontHistoryRoutingModule { }
