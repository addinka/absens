import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRequestOvertimeApproveComponent } from './detail-request-overtime-approve.component';

describe('DetailRequestOvertimeApproveComponent', () => {
  let component: DetailRequestOvertimeApproveComponent;
  let fixture: ComponentFixture<DetailRequestOvertimeApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestOvertimeApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestOvertimeApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
