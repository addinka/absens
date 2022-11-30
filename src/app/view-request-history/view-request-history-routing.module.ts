import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewRequestHistoryComponent } from './view-request-history/view-request-history.component';

const routes: Routes = [{
	path: '',
	component: ViewRequestHistoryComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ViewRequestHistoryRoutingModule { }
