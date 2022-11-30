import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskResultModalComponent } from './risk-result-modal.component';

describe('RiskResultModalComponent', () => {
  let component: RiskResultModalComponent;
  let fixture: ComponentFixture<RiskResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
