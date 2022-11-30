import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailRequestItemModalComponent } from './detail-request-item-modal.component';

describe('DetailRequestItemModalComponent', () => {
  let component: DetailRequestItemModalComponent;
  let fixture: ComponentFixture<DetailRequestItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
