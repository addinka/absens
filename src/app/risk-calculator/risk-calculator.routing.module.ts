import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiskCalculatorComponent } from './risk-calculator/risk-calculator.component';

const routes: Routes = [{
	path: '',
	component: RiskCalculatorComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class RiskCalculatorRoutingModule { }
