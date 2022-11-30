import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestComponent } from './detail-request/detail-request.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestRoutingModule { }
