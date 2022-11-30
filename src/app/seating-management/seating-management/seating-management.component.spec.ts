import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingManagementComponent } from './seating-management.component';

describe('SeatingManagementComponent', () => {
  let component: SeatingManagementComponent;
  let fixture: ComponentFixture<SeatingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
