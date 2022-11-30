import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StarterHomeComponent } from './starter-home.component';

describe('HomeComponent', () => {
	let component: StarterHomeComponent;
	let fixture: ComponentFixture<StarterHomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ StarterHomeComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StarterHomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
