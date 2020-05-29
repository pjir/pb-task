import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TileContentComponent } from './tile-content.component';

describe('TileContentComponent', () => {
  let component: TileContentComponent;
  let fixture: ComponentFixture<TileContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TileContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
