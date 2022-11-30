import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';

const routes: Routes = [{
	path: '',
	component: LogoutModalComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class LogoutModalRoutingModule { }
