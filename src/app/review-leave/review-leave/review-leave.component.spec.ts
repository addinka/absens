import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLeaveComponent } from './review-leave.component';

describe('ReviewLeaveComponent', () => {
  let component: ReviewLeaveComponent;
  let fixture: ComponentFixture<ReviewLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
