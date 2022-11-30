import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOvertimeRequestComponent } from './create-overtime-request.component';

describe('CreateOvertimeRequestComponent', () => {
	let component: CreateOvertimeRequestComponent;
	let fixture: ComponentFixture<CreateOvertimeRequestComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CreateOvertimeRequestComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateOvertimeRequestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
