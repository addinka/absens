import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniGameComponent } from './mini-game.component';

describe('MiniGameComponent', () => {
	let component: MiniGameComponent;
	let fixture: ComponentFixture<MiniGameComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MiniGameComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MiniGameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
