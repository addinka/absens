import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeatingManagementComponent } from './seating-management/seating-management.component';

const routes: Routes = [{
	path: '',
	component: SeatingManagementComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class SeatingManagementRoutingModule { }
