import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLeaveModalComponent } from './daily-leave-modal.component';

describe('DailyLeaveModalComponent', () => {
  let component: DailyLeaveModalComponent;
  let fixture: ComponentFixture<DailyLeaveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyLeaveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyLeaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
