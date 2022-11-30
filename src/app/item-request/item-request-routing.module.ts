import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemRequestComponent } from './item-request/item-request.component';

const routes: Routes = [{
	path: '',
	component: ItemRequestComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ItemRequestRoutingModule { }
