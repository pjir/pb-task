import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';

export class MatSnackbarMock {
  open() {}
}

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useClass: MatSnackbarMock }]
    });
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error on incorred sort field', () => {
    expect(() => {
      service.sortChange({ sortBy: 'BAD', sortOrder: 'DESC' });
    }).toThrowError('Unknown transaction sort type');
  });

  it('should return transaction with negative amount value', () => {
    const reverseTransaction = service.reverseToNegativeAmount({ amount: '234' } as Transaction);
    expect(reverseTransaction.amount).toBe('-234');
  });
});
