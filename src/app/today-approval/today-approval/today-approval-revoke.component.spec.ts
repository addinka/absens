import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayApprovalRevokeComponent } from './today-approval-revoke.component';

describe('TodayApprovalRevokeComponent', () => {
  let component: TodayApprovalRevokeComponent;
  let fixture: ComponentFixture<TodayApprovalRevokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayApprovalRevokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayApprovalRevokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
