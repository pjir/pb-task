import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search.component';
import { SearchModule } from './search.module';

describe('SearchComponent', () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let testComponentDe: DebugElement;
  let componentDe: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SearchModule, NoopAnimationsModule],
      declarations: [TestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    testComponentDe = fixture.debugElement;
    componentDe = testComponentDe.query(By.directive(SearchComponent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentDe).toBeTruthy();
  });

  it('should has class pb-search', () => {
    expect(componentDe.nativeElement).toHaveClass('pb-search');
  });

  it('should have clear button visibled and it should working and should emit change', () => {
    testComponent.searchKeyword = 'a';
    fixture.detectChanges();
    const button = componentDe.query(By.css('button'));
    expect(button).toBeTruthy();
    button.nativeElement.click();
    fixture.detectChanges();
    const button2 = componentDe.query(By.css('button'));
    expect(button2).not.toBeTruthy();
    expect(testComponent.searchKeyword).toBe('');
  });

  @Component({
    selector: `pb-testcomponent`,
    template: `<pb-search [(searchKeyword)]="searchKeyword"></pb-search>`
  })
  class TestComponent {
    searchKeyword = '';
  }
});
