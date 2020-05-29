import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/shared/services/transaction.model';
import { SortByOption, SortByValue } from '../../shared/components/sort-by-bar/sort-by-bar.model';
import { TransactionSortActions } from '../../shared/services/transaction-pipes';
import { TransactionService } from '../../shared/services/transaction.service';

@Component({
  selector: 'pb-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentTransactionsComponent implements OnInit {
  /** Transactions data stream */
  transactions$: Observable<Transaction[]>;

  /** Options for "Sort by" buttons */
  sortByOptions: SortByOption[] = [
    { value: TransactionSortActions.SORT_BY_DATE, name: 'Date', arialLabel: 'Sort by date' },
    { value: TransactionSortActions.SORT_BY_BENEFICIARY, name: 'Beneficiary', arialLabel: 'Sort by beneficiary' },
    { value: TransactionSortActions.SORT_BY_AMOUNT, name: 'Amount', arialLabel: 'Sort by amount' }
  ];

  /** Value for pb-sort-by-bar component */
  sortBy$: Observable<SortByValue>;

  /** Value for pb-search component */
  searchKeyword = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    // We create new observable because we want to be sure that sorted data are not mutable
    this.sortBy$ = this.transactionService.transactions$.pipe(
      map(res => {
        // We can set search keyword like this because it is a primitive value
        this.searchKeyword = res.filter || '';
        const sortBy: SortByValue = { sortBy: res.sortBy, sortOrder: res.sortOrder };
        return sortBy;
      })
    );

    // Transaction obserable
    this.transactions$ = this.transactionService.transactions$.pipe(
      map(r => r.payload),
      map(r => r.map(v => this.transactionService.reverseToNegativeAmount(v)))
    );

    // Get all data
    this.transactionService.getAll();
  }

  /**
   * Change transactions order based on provided parameters
   *
   * @param sort sort params
   */
  changeSort(sort: SortByValue) {
    this.transactionService.sortChange(sort);
  }

  /**
   * Filter transactions by provided keyword
   *
   * @param filter search keyword
   */
  filterTransaction(filter: string) {
    this.transactionService.filterTransactions(filter);
  }
}
