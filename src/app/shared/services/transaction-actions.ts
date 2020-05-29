import { SORT_BY_ORDER_TYPE } from '../components/sort-by-bar/sort-by-bar.model';
import { Transaction } from './transaction.model';

export const filterTransactionByBeneficiary = (transactions: Transaction[], filter: string) => {
  if (filter) {
    const regexpFilter = new RegExp(filter, 'i');
    return [...transactions].filter(t => regexpFilter.test(t.merchant));
  } else {
    return transactions;
  }
};

export const sortTransactionByAmount = (transactions: Transaction[], descendancy: SORT_BY_ORDER_TYPE = 'DESC') => {
  const sortedTransactions = [...transactions].sort((a, b) => +a.amount - +b.amount);
  return descendancy === 'DESC' ? sortedTransactions.reverse() : sortedTransactions;
};

export const sortTransactionByDate = (transactions: Transaction[], descendancy: SORT_BY_ORDER_TYPE = 'DESC') => {
  const sortedTransactions = [...transactions].sort((a, b) => a.transactionDate - b.transactionDate);
  return descendancy === 'DESC' ? sortedTransactions.reverse() : sortedTransactions;
};

export const sortTransactionByBeneficiary = (transactions: Transaction[], descendancy: SORT_BY_ORDER_TYPE = 'DESC') => {
  const sortedTransactions = [...transactions].sort((a, b) => a.merchant.localeCompare(b.merchant));
  return descendancy === 'DESC' ? sortedTransactions.reverse() : sortedTransactions;
};
