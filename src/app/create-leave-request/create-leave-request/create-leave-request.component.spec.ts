import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeaveRequestComponent } from './create-leave-request.component';

describe('CreateLeaveRequestComponent', () => {
  let component: CreateLeaveRequestComponent;
  let fixture: ComponentFixture<CreateLeaveRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeaveRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
