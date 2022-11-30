import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishOvertimeComponent } from './finish-overtime.component';

describe('FinishOvertimeComponent', () => {
  let component: FinishOvertimeComponent;
  let fixture: ComponentFixture<FinishOvertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishOvertimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
