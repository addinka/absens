import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

const routes: Routes = [{
	path: '',
	component: ConfirmationModalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ConfirmationModalRoutingModule { }
