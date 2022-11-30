import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRejectComponent } from './multiple-reject.component';

describe('MultipleRejectComponent', () => {
  let component: MultipleRejectComponent;
  let fixture: ComponentFixture<MultipleRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
