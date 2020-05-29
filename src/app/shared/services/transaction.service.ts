import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import mockTransactions from '../../../../mock/transactions.json';
import { SortByValue, SORT_BY_ORDER_TYPE } from '../components/sort-by-bar/sort-by-bar.model';
import {
  StreamData,
  transactionFilterMap,
  transactionReducer,
  TransactionSortActions,
  transactionSortMap
} from './transaction-pipes';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  /** Buffer for mocking data */
  #fakeBufferData: Transaction[] = mockTransactions.data as Transaction[];

  /**
   * Subject for transaction stream data
   */
  #transactions = new BehaviorSubject<StreamData<Transaction[]>>({
    action: 'ADD',
    payload: []
  });

  /**
   * Transactions stream
   */
  transactions$ = this.#transactions.pipe(transactionReducer(), transactionFilterMap(), transactionSortMap(), share());

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Returns mock transactions data with type
   */
  getAll() {
    // fake async response
    setTimeout(() => {
      this.#transactions.next({
        action: 'ADD',
        payload: [...this.#fakeBufferData]
      });
    }, 10);
  }

  /**
   * Add new transaction
   *
   * @param transaction Single transaction object
   */
  addTransaction(transaction: Transaction) {
    this.#fakeBufferData.push(transaction);
    this.#transactions.next({
      action: 'ADD',
      payload: [...this.#fakeBufferData],
      sortBy: 'SORT_BY_DATE',
      sortOrder: 'DESC',
      filter: ''
    });
    this.snackBar.open(`Transfer has been sent.`, '', { duration: 3000 });
  }

  /**
   * Filter transactions by keyword
   *
   * @param filter filter keyword
   */
  filterTransactions(filter: string) {
    this.#transactions.next({ action: 'ADD', payload: this.#fakeBufferData, filter });
  }

  /**
   * Checking if sorting type is correct and based on them run assing action
   *
   * @param sort Sort object
   */
  sortChange(sort: SortByValue) {
    switch (sort.sortBy) {
      case TransactionSortActions.SORT_BY_DATE:
        this.sortByDate(sort.sortOrder);
        break;
      case TransactionSortActions.SORT_BY_BENEFICIARY:
        this.sortByBeneficiary(sort.sortOrder);
        break;
      case TransactionSortActions.SORT_BY_AMOUNT:
        this.sortByAmount(sort.sortOrder);
        break;
      default:
        throw Error('Unknown transaction sort type');
    }
  }

  /**
   * Sort by date
   *
   * @param sortOrder Sort order
   */
  sortByDate(sortOrder: SORT_BY_ORDER_TYPE) {
    this.#transactions.next({ sortBy: 'SORT_BY_DATE', sortOrder });
  }

  /**
   * Sort by beneficiary
   *
   * @param sortOrder Sort order
   */
  sortByBeneficiary(sortOrder: SORT_BY_ORDER_TYPE) {
    this.#transactions.next({ sortBy: 'SORT_BY_BENEFICIARY', sortOrder });
  }

  /**
   * Sort by amount
   *
   * @param sortOrder Sort order
   */
  sortByAmount(sortOrder: SORT_BY_ORDER_TYPE) {
    this.#transactions.next({ sortBy: 'SORT_BY_AMOUNT', sortOrder });
  }

  /**
   * Returns transaction with converted amount property to negative value
   *
   * @param transaction Single transaction object
   */
  reverseToNegativeAmount(transaction: Transaction): Transaction {
    const revertTransaction = Math.abs(+transaction.amount) * -1;
    return { ...transaction, amount: revertTransaction.toString() };
  }
}
