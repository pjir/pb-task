import { CommonModule, CurrencyPipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { MakeTransferComponent } from './make-transfer.component';

describe('MakeTransferComponent', () => {
  let component: MakeTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, SharedModule, NoopAnimationsModule],
      declarations: [MakeTransferComponent],
      providers: [CurrencyPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
