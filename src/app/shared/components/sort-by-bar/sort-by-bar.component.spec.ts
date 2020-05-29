import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SortByBarComponent } from './sort-by-bar.component';

describe('SortByBarComponent', () => {
  let component: SortByBarComponent;
  let fixture: ComponentFixture<SortByBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonToggleModule],
      declarations: [SortByBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
