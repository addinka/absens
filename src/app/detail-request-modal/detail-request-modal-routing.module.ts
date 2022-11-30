import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestModalComponent } from './detail-request-modal/detail-request-modal.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestModalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestModalRoutingModule { }
