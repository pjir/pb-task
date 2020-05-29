import { async, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ComponentsModule, NoopAnimationsModule, BrowserDynamicTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have correct path to logotype', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.peachtree-bank-logo').src).toContain('/assets/logo.jpg');
  });
});
