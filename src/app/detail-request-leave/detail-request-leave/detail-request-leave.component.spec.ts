import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRequestLeaveComponent } from './detail-request-leave.component';

describe('DetailRequestLeaveComponent', () => {
	let component: DetailRequestLeaveComponent;
	let fixture: ComponentFixture<DetailRequestLeaveComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DetailRequestLeaveComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DetailRequestLeaveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
