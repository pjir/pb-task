import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MakeTransferDialogComponent } from '../make-transfer-dialog/make-transfer-dialog.component';
import { MakeTransferComponent } from './make-transfer.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [MakeTransferComponent],
  exports: [MakeTransferComponent],
  entryComponents: [MakeTransferDialogComponent],
  providers: [CurrencyPipe]
})
export class MakeTransferModule {}
