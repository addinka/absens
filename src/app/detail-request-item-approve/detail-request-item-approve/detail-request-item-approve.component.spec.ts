import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRequestItemApproveComponent } from './detail-request-item-approve.component';

describe('DetailRequestItemApproveComponent', () => {
  let component: DetailRequestItemApproveComponent;
  let fixture: ComponentFixture<DetailRequestItemApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestItemApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestItemApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
