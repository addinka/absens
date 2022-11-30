import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemStockComponent } from './item-stock/item-stock.component';

const routes: Routes = [{
	path: '',
	component: ItemStockComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ItemStockRoutingModule { }
