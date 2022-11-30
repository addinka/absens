import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayImageModalComponent } from './display-image-modal/display-image-modal.component';

const routes: Routes = [{
	path: '',
	component: DisplayImageModalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class DisplayImageModalRoutingModule { }
