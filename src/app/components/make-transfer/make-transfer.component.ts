import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Transaction } from '../../shared/services/transaction.model';
import { TransactionService } from '../../shared/services/transaction.service';
import { MakeTransferDialogComponent } from '../make-transfer-dialog/make-transfer-dialog.component';

export interface MakeTransfer {
  fromAccount: string;
  toAccount: string;
  amount: number;
}

@Component({
  selector: 'pb-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakeTransferComponent implements OnInit, OnDestroy {
  @ViewChild('transferForm') transferForm: FormGroupDirective;

  accountBalance = 0;
  readonly balanceLimit = -500;

  #subs = new Subscription();

  form = new FormGroup({
    fromAccount: new FormControl(''),
    toAccount: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required])
  });

  constructor(
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private currPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    // Initial fake "From account" with balance
    this.updateBalance(5824.76);
    this.checkBalance();
  }

  ngOnDestroy() {
    this.#subs.unsubscribe();
  }

  /**
   * Open confirmation dialog if the form is valid
   */
  submitTransfer() {
    if (this.form.valid) {
      const transferData = this.form.value as MakeTransfer;
      this.openDialog(transferData);
    }
  }

  /**
   * Open dialog to confirm new transfer, and when successed make new transfer
   *
   * @param transferData Data needed to make a transfer
   */
  openDialog(transferData: MakeTransfer) {
    const dialogRef = this.dialog.open(MakeTransferDialogComponent, {
      data: transferData,
      autoFocus: false,
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((confirmTransaction: boolean) => {
      if (confirmTransaction) {
        this.appendTransaction();
      }
    });
  }

  /**
   * Send transaction and reset form data and state
   */
  appendTransaction() {
    if (this.form.valid) {
      const newTransaction = this.generateFakeData();
      this.transactionService.addTransaction(newTransaction);
      const newAccountBalance = this.accountBalance - +newTransaction.amount;
      this.transferForm.resetForm();
      this.updateBalance(newAccountBalance);
    }
  }

  /** Add custom observable  */
  checkBalance() {
    this.#subs.add(
      this.form.controls.amount.valueChanges.subscribe(value => {
        if (value) {
          this.form.controls.amount.markAsTouched();
        }
        let errors: ValidationErrors = null;
        const fixedValue = value ? +value.toFixed(2) : 0;
        if (fixedValue <= 0) {
          errors = { negativeAmount: true };
        }
        const newAccountBalance = this.accountBalance - fixedValue;
        if (newAccountBalance <= this.balanceLimit) {
          errors = { balanceExceeded: true };
        }
        this.form.controls.amount.setErrors(errors);
      })
    );
  }

  /**
   * Generate fake "From account" with balance value
   *
   * @param newAccountBalance Updated balance amount
   */
  updateBalance(newAccountBalance: number) {
    this.accountBalance = +newAccountBalance.toFixed(2);
    const balanceValue = this.currPipe.transform(this.accountBalance);
    this.form.patchValue({ fromAccount: `Free Checking(4692): ${balanceValue}` }, { onlySelf: true, emitEvent: false });
  }

  /** Generate fake data to new transfer */
  private generateFakeData() {
    const formData = this.form.value as MakeTransfer;
    const newTransaction: Transaction = {
      amount: formData.amount.toFixed(2),
      merchant: formData.toAccount,
      categoryCode: this.getRandomColor(),
      transactionDate: new Date().getTime(),
      merchantLogo: '',
      transactionType: 'Online Transfer'
    };
    return newTransaction;
  }

  /** Generate random color for fake transaction categoryCode */
  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
