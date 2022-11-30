import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailApprovalComponent } from './request-detail-approval.component';

describe('RequestDetailApprovalComponent', () => {
  let component: RequestDetailApprovalComponent;
  let fixture: ComponentFixture<RequestDetailApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDetailApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDetailApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
