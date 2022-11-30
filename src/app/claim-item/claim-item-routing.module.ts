import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimItemComponent } from './claim-item/claim-item.component';

const routes: Routes = [{
	path: '',
	component: ClaimItemComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ClaimItemRoutingModule { }
