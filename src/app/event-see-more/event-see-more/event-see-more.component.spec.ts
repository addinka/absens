import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSeeMoreComponent } from './event-see-more.component';

describe('EventSeeMoreComponent', () => {
  let component: EventSeeMoreComponent;
  let fixture: ComponentFixture<EventSeeMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSeeMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSeeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
