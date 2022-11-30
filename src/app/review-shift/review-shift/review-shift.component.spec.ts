import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewShiftComponent } from './review-shift.component';

describe('ReviewShiftComponent', () => {
  let component: ReviewShiftComponent;
  let fixture: ComponentFixture<ReviewShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
