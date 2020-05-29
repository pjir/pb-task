import { NgModule } from '@angular/core';
import { MakeTransferModule } from './make-transfer/make-transfer.module';
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MakeTransferDialogComponent } from './make-transfer-dialog/make-transfer-dialog.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [MakeTransferModule, RecentTransactionsComponent],
  declarations: [RecentTransactionsComponent, MakeTransferDialogComponent]
})
export class ComponentsModule {}
