import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateShiftComponent } from './create-update-shift.component';

describe('CreateUpdateShiftComponent', () => {
  let component: CreateUpdateShiftComponent;
  let fixture: ComponentFixture<CreateUpdateShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
