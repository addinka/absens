import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHealthRequestComponent } from './create-health-request.component';

describe('CreateHealthRequestComponent', () => {
	let component: CreateHealthRequestComponent;
	let fixture: ComponentFixture<CreateHealthRequestComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CreateHealthRequestComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateHealthRequestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
