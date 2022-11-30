import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
	ButtonModule,
	CheckboxModule,
	ComboBoxModule,
	DialogModule,
	GridModule,
	InputModule,
	ListModule,
	LoadingModule,
	NumberModule,
	PlaceholderModule,
	RadioModule,
	TabsModule,
    TilesModule,
    ModalModule,
} from 'carbon-components-angular';
import { InformationFilledModule } from '@carbon/icons-angular';
import { LetterOfDutyComponent } from './letter-of-duty/letter-of-duty.component';
import { LetterOfDutyRoutingModule } from './letter-of-duty-routing.module';

@NgModule({
	imports: [
		LetterOfDutyRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		CheckboxModule,
		ComboBoxModule,
		DialogModule,
		GridModule,
		InformationFilledModule,
		InputModule,
		ListModule,
		LoadingModule,
		NumberModule,
		PlaceholderModule,
		RadioModule,
		TabsModule,
        TilesModule,
        ModalModule,
    ],
    exports: [

    ],
	declarations: [LetterOfDutyComponent]
})
export class ReviewRequestModule { }
