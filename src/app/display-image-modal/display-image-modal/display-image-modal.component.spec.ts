import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayImageModalComponent } from './display-image-modal.component';

describe('DisplayImageModalComponent', () => {
  let component: DisplayImageModalComponent;
  let fixture: ComponentFixture<DisplayImageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayImageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
