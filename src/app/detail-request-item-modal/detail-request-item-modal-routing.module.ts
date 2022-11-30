import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRequestItemModalComponent } from './detail-request-item-modal/detail-request-item-modal.component';

const routes: Routes = [{
	path: '',
	component: DetailRequestItemModalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DetailRequestItemModalRoutingModule { }
