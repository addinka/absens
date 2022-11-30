import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableApprovalComponent } from './table-approval.component';

describe('TableApprovalComponent', () => {
  let component: TableApprovalComponent;
  let fixture: ComponentFixture<TableApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
