import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelModalComponent } from './cancel-modal/cancel-modal.component';

const routes: Routes = [{
	path: '',
	component: CancelModalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class CancelModalRoutingModule { }
