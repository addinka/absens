import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestItemComponent } from './detail-request-item/detail-request-item.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestItemComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestItemRoutingModule { }
