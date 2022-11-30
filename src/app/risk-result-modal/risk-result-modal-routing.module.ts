import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiskResultModalComponent } from './risk-result-modal/risk-result-modal.component';
const routes: Routes = [{
	path: '',
	component: RiskResultModalComponent
}];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class RiskResultModalRoutingModule { }
