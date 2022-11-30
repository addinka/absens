import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkAssignmentRequestComponent } from './create-work-assignment-request.component';

describe('CreateWorkAssignmentRequestComponent', () => {
  let component: CreateWorkAssignmentRequestComponent;
  let fixture: ComponentFixture<CreateWorkAssignmentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkAssignmentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkAssignmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
