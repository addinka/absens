import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterOfDutyComponent } from './letter-of-duty.component';

describe('LetterOfDutyComponent', () => {
  let component: LetterOfDutyComponent;
  let fixture: ComponentFixture<LetterOfDutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterOfDutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterOfDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
