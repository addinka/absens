import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiniGameComponent } from './mini-game/mini-game.component';

const routes: Routes = [{
	path: '',
	component: MiniGameComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MiniGameRoutingModule { }
