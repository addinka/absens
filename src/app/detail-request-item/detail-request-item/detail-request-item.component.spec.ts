import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailRequestItemComponent } from './detail-request-item.component';

describe('DetailRequestItemComponent', () => {
  let component: DetailRequestItemComponent;
  let fixture: ComponentFixture<DetailRequestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
