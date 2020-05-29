import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { MakeTransfer } from '../make-transfer/make-transfer.component';
import { MakeTransferDialogComponent } from './make-transfer-dialog.component';

describe('MakeTransferDialogComponent', () => {
  let component: MakeTransferDialogComponent;
  let fixture: ComponentFixture<MakeTransferDialogComponent>;

  const MAT_DIALOG_DATA_MOCK: MakeTransfer = { fromAccount: 'a', toAccount: 'b', amount: 10 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MakeTransferDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_MOCK }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
