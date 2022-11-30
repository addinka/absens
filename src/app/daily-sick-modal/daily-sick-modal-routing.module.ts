import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailySickModalComponent } from './daily-sick-modal/daily-sick-modal.component';

const routes: Routes = [{
	path: '',
	component: DailySickModalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class DailySickModalRoutingModule { }
