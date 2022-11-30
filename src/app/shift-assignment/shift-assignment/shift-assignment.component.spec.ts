import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentComponent } from './shift-assignment.component';

describe('ShiftAssignmentComponent', () => {
  let component: ShiftAssignmentComponent;
  let fixture: ComponentFixture<ShiftAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
