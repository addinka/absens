import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentHistoryComponent } from './shift-assignment-history.component';

describe('ShiftAssignmentHistoryComponent', () => {
  let component: ShiftAssignmentHistoryComponent;
  let fixture: ComponentFixture<ShiftAssignmentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
