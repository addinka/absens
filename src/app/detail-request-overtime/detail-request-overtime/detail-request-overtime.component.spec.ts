import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRequestOvertimeComponent } from './detail-request-overtime.component';

describe('DetailRequestOvertimeComponent', () => {
  let component: DetailRequestOvertimeComponent;
  let fixture: ComponentFixture<DetailRequestOvertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestOvertimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
