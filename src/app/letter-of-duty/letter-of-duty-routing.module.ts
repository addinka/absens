import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LetterOfDutyComponent } from './letter-of-duty/letter-of-duty.component';

const routes: Routes = [{
	path: '',
	component: LetterOfDutyComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LetterOfDutyRoutingModule { }
