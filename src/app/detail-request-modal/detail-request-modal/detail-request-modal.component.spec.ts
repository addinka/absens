import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailRequestModalComponent } from './detail-request-modal.component';

describe('DetailRequestModalComponent', () => {
  let component: DetailRequestModalComponent;
  let fixture: ComponentFixture<DetailRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
