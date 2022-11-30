import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftExcelApprovalComponent } from './shift-excel-approval.component';

describe('ShiftExcelApprovalComponent', () => {
  let component: ShiftExcelApprovalComponent;
  let fixture: ComponentFixture<ShiftExcelApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftExcelApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftExcelApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
