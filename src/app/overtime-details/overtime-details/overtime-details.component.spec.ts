import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeDetailsComponent } from './overtime-details.component';

describe('OvertimeDetailsComponent', () => {
  let component: OvertimeDetailsComponent;
  let fixture: ComponentFixture<OvertimeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
