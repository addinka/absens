import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteManagementComponent } from './site-management/site-management.component';

const routes: Routes = [{
	path: '',
	component: SiteManagementComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class SiteManagementRoutingModule { }
