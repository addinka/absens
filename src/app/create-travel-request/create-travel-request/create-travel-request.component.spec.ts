import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTravelRequestComponent } from './create-travel-request.component';

describe('CreateTravelRequestComponent', () => {
  let component: CreateTravelRequestComponent;
  let fixture: ComponentFixture<CreateTravelRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTravelRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTravelRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
