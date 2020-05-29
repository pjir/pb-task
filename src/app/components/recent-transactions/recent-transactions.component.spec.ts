import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { RecentTransactionsComponent } from './recent-transactions.component';

describe('RecentTransactionsComponent', () => {
  let component: RecentTransactionsComponent;
  let fixture: ComponentFixture<RecentTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [RecentTransactionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
