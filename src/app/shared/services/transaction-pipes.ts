import { pipe } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { SORT_BY_ORDER_TYPE } from '../components/sort-by-bar/sort-by-bar.model';
import {
  filterTransactionByBeneficiary,
  sortTransactionByAmount,
  sortTransactionByBeneficiary,
  sortTransactionByDate
} from './transaction-actions';
import { Transaction } from './transaction.model';

/**
 * Unique actions for transaction reducer
 */
export enum TransactionReducerActions {
  ADD = '[Transaction] = Add new transactions',
  UPDATE = '[Transaction] = Update data'
}

/**
 * Unique actions to sort transactions
 */
export enum TransactionSortActions {
  SORT_BY_DATE = 'SORT_BY_DATE',
  SORT_BY_BENEFICIARY = 'SORT_BY_BENEFICIARY',
  SORT_BY_AMOUNT = 'SORT_BY_AMOUNT'
}

/**
 * Interface for streaming data
 */
export interface StreamData<T> {
  action?: keyof typeof TransactionReducerActions;
  payload?: T;
  filter?: string;
  sortBy?: keyof typeof TransactionSortActions;
  sortOrder?: SORT_BY_ORDER_TYPE;
}

/**
 * RxJS pipe to sort transactions based on sortBy key and order ASC or DESC
 */
export function transactionSortMap() {
  return pipe(
    map<StreamData<Transaction[]>, StreamData<Transaction[]>>(curr => {
      switch (curr.sortBy) {
        case 'SORT_BY_AMOUNT':
          return { ...curr, payload: sortTransactionByAmount(curr.payload, curr.sortOrder) };
        case 'SORT_BY_BENEFICIARY':
          return { ...curr, payload: sortTransactionByBeneficiary(curr.payload, curr.sortOrder) };
        case 'SORT_BY_DATE':
          return { ...curr, payload: sortTransactionByDate(curr.payload, curr.sortOrder) };
        default:
          return { ...curr };
      }
    })
  );
}

/**
 * RxJS pipe to filter payload data by filter keyword
 */
export function transactionFilterMap() {
  return pipe(
    map<StreamData<Transaction[]>, StreamData<Transaction[]>>(curr => {
      if (curr.filter) {
        curr.payload = filterTransactionByBeneficiary(curr.payload, curr.filter);
      }
      return curr;
    })
  );
}

/**
 * RxJS pipe to reduce transaction based on reducer action key
 */
export function transactionReducer() {
  return pipe(
    scan<StreamData<Transaction[]>>(
      (acc, curr) => {
        const newStreamData = { ...acc };
        newStreamData.filter = typeof curr.filter === 'string' ? curr.filter : acc.filter || '';
        newStreamData.sortBy = curr.sortBy || acc.sortBy || 'SORT_BY_DATE';
        newStreamData.sortOrder = curr.sortOrder || acc.sortOrder || 'DESC';
        switch (curr.action) {
          case 'ADD':
            newStreamData.action = 'ADD';
            newStreamData.payload = [...curr.payload];
            break;
          default:
            newStreamData.action = 'UPDATE';
            break;
        }
        return newStreamData;
      },
      {
        action: 'ADD',
        payload: [],
        sortBy: 'SORT_BY_DATE',
        sortOrder: 'DESC'
      }
    )
  );
}
