import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WrapperComponent } from './wrapper.component';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WrapperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has class pb-wrapper', () => {
    const el = fixture.debugElement.nativeElement;
    expect(el).toHaveClass('pb-wrapper');
  });
});
