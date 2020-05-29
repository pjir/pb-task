import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MakeTransfer } from '../make-transfer/make-transfer.component';

@Component({
  templateUrl: './make-transfer-dialog.component.html',
  styleUrls: ['./make-transfer-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakeTransferDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MakeTransferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public transferData: MakeTransfer
  ) {}

  ngOnInit(): void {}

  cancelTransfer() {
    this.dialogRef.close();
  }
}
