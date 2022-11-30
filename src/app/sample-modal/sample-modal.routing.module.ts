import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleModalComponent } from './sample-modal/sample-modal.component';

const routes: Routes = [{
		path: '',
		component: SampleModalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SampleModalRoutingModule { }
