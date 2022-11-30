import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventSeeMoreComponent } from './event-see-more/event-see-more.component';

const routes: Routes = [{
	path: '',
	component: EventSeeMoreComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class EventSeeMoreRoutingModule { }
