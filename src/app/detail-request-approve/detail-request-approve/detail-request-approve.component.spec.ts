import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRequestApproveComponent } from './detail-request-approve.component';

describe('DetailRequestApproveComponent', () => {
  let component: DetailRequestApproveComponent;
  let fixture: ComponentFixture<DetailRequestApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
