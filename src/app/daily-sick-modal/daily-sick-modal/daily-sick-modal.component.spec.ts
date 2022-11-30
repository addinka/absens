import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySickModalComponent } from './daily-sick-modal.component';

describe('DailySickModalComponent', () => {
  let component: DailySickModalComponent;
  let fixture: ComponentFixture<DailySickModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySickModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySickModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
