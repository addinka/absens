import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogModalComponent } from './log-modal/log-modal.component';

const routes: Routes = [{
	path: '',
	component: LogModalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LogModalRoutingModule { }
