import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRequestOvertimeEdComponent } from './detail-request-overtime-ed.component';

describe('DetailRequestOvertimeEdComponent', () => {
  let component: DetailRequestOvertimeEdComponent;
  let fixture: ComponentFixture<DetailRequestOvertimeEdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestOvertimeEdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestOvertimeEdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
