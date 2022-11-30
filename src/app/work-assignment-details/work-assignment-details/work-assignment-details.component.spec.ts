import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAssignmentDetailsComponent } from './work-assignment-details.component';

describe('WorkAssignmentDetailsComponent', () => {
  let component: WorkAssignmentDetailsComponent;
  let fixture: ComponentFixture<WorkAssignmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAssignmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAssignmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
