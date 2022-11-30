import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRequestShiftApproveComponent } from './detail-request-shift-approve.component';

describe('DetailRequestShiftApproveComponent', () => {
  let component: DetailRequestShiftApproveComponent;
  let fixture: ComponentFixture<DetailRequestShiftApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestShiftApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestShiftApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
