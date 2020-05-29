import {
  filterTransactionByBeneficiary,
  sortTransactionByAmount,
  sortTransactionByBeneficiary,
  sortTransactionByDate
} from './transaction-actions';
import { Transaction } from './transaction.model';

describe('TransactionActions', () => {
  let source: Partial<Transaction>[];

  beforeEach(() => {
    source = [
      { merchant: 'acx', transactionDate: 3, amount: '10' },
      { merchant: 'ba', transactionDate: 1, amount: '20' },
      { merchant: 'aca', transactionDate: 2, amount: '30' }
    ];
  });

  it('shoud filter transaction', () => {
    const expected: Partial<Transaction>[] = [
      { merchant: 'acx', transactionDate: 3, amount: '10' },
      { merchant: 'aca', transactionDate: 2, amount: '30' }
    ];

    const filteredTransactions = filterTransactionByBeneficiary(source as Transaction[], 'ac');
    expect(filteredTransactions).toEqual(expected as Transaction[]);
    const filteredTransactions2 = filterTransactionByBeneficiary(source as Transaction[], 'ba');
    expect(filteredTransactions2.length).toBe(1);
  });

  it('shoud sort transaction by date ASC', () => {
    const expected: Partial<Transaction>[] = [
      { merchant: 'ba', transactionDate: 1, amount: '20' },
      { merchant: 'aca', transactionDate: 2, amount: '30' },
      { merchant: 'acx', transactionDate: 3, amount: '10' }
    ];

    const filteredTransactions = sortTransactionByDate(source as Transaction[], 'ASC');

    expect(filteredTransactions).toEqual(expected as Transaction[]);
  });

  it('shoud sort transaction by date DESC', () => {
    const expected: Partial<Transaction>[] = [
      { merchant: 'acx', transactionDate: 3, amount: '10' },
      { merchant: 'aca', transactionDate: 2, amount: '30' },
      { merchant: 'ba', transactionDate: 1, amount: '20' }
    ];

    const filteredTransactions = sortTransactionByDate(source as Transaction[], 'DESC');

    expect(filteredTransactions).toEqual(expected as Transaction[]);
  });

  it('shoud sort transaction by amount ASC', () => {
    const expected: Partial<Transaction>[] = [
      { merchant: 'acx', transactionDate: 3, amount: '10' },
      { merchant: 'ba', transactionDate: 1, amount: '20' },
      { merchant: 'aca', transactionDate: 2, amount: '30' }
    ];

    const filteredTransactions = sortTransactionByAmount(source as Transaction[], 'ASC');

    expect(filteredTransactions).toEqual(expected as Transaction[]);
  });

  it('shoud sort transaction by amount DESC', () => {
    const expected: Partial<Transaction>[] = [
      { merchant: 'aca', transactionDate: 2, amount: '30' },
      { merchant: 'ba', transactionDate: 1, amount: '20' },
      { merchant: 'acx', transactionDate: 3, amount: '10' }
    ];

    const filteredTransactions = sortTransactionByAmount(source as Transaction[], 'DESC');

    expect(filteredTransactions).toEqual(expected as Transaction[]);
  });

  it('shoud sort transaction by beneficiary ASC', () => {
    const expected: Partial<Transaction>[] = [
      { merchant: 'aca', transactionDate: 2, amount: '30' },
      { merchant: 'acx', transactionDate: 3, amount: '10' },
      { merchant: 'ba', transactionDate: 1, amount: '20' }
    ];

    const filteredTransactions = sortTransactionByBeneficiary(source as Transaction[], 'ASC');

    expect(filteredTransactions).toEqual(expected as Transaction[]);
  });

  it('shoud sort transaction by beneficiary DESC', () => {
    const expected: Partial<Transaction>[] = [
      { merchant: 'ba', transactionDate: 1, amount: '20' },
      { merchant: 'acx', transactionDate: 3, amount: '10' },
      { merchant: 'aca', transactionDate: 2, amount: '30' }
    ];

    const filteredTransactions = sortTransactionByBeneficiary(source as Transaction[], 'DESC');

    expect(filteredTransactions).toEqual(expected as Transaction[]);
  });
});
