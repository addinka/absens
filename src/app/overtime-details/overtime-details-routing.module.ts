import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OvertimeDetailsComponent } from './overtime-details/overtime-details.component';

const routes: Routes = [{
	path: '',
	component: OvertimeDetailsComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OvertimeDetailsRoutingModule { }
