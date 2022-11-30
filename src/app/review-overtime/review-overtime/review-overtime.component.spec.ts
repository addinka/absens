import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOvertimeComponent } from './review-overtime.component';

describe('ReviewOvertimeComponent', () => {
  let component: ReviewOvertimeComponent;
  let fixture: ComponentFixture<ReviewOvertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewOvertimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
