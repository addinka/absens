import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineApprovalComponent } from './vaccine-approval.component';

describe('VaccineApprovalComponent', () => {
  let component: VaccineApprovalComponent;
  let fixture: ComponentFixture<VaccineApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
