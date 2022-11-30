import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCheckupComponent } from './daily-checkup.component';

describe('DailyCheckupComponent', () => {
  let component: DailyCheckupComponent;
  let fixture: ComponentFixture<DailyCheckupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyCheckupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
