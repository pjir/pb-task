import { marbles } from 'rxjs-marbles/jasmine';
import { scan } from 'rxjs/operators';
import { StreamData, transactionFilterMap, transactionReducer, transactionSortMap } from './transaction-pipes';
import { Transaction } from './transaction.model';

export class MatSnackbarMock {
  open() {}
}

describe('TransactionPipes', () => {
  beforeEach(() => {});

  it(
    'transactionReducer should add payload and combine other properties',
    marbles(m => {
      const inputs: { [key: string]: StreamData<Partial<Transaction>[]> } = {
        a: {
          action: 'ADD',
          payload: []
        },
        b: {
          action: 'ADD',
          payload: [
            { merchant: 'acx', transactionDate: 3, amount: '10' },
            { merchant: 'aca', transactionDate: 2, amount: '30' },
            { merchant: 'ba', transactionDate: 1, amount: '20' }
          ],
          sortOrder: 'ASC'
        },
        c: {
          sortBy: 'SORT_BY_AMOUNT',
          sortOrder: 'DESC'
        }
      };
      const outputs: { [key: string]: StreamData<Partial<Transaction>[]> } = {
        x: {
          action: 'ADD',
          payload: [],
          sortBy: 'SORT_BY_DATE',
          sortOrder: 'DESC',
          filter: ''
        },
        y: {
          action: 'ADD',
          payload: [
            { merchant: 'acx', transactionDate: 3, amount: '10' },
            { merchant: 'aca', transactionDate: 2, amount: '30' },
            { merchant: 'ba', transactionDate: 1, amount: '20' }
          ],
          sortBy: 'SORT_BY_DATE',
          sortOrder: 'ASC',
          filter: ''
        },
        z: {
          action: 'UPDATE',
          payload: [
            { merchant: 'acx', transactionDate: 3, amount: '10' },
            { merchant: 'aca', transactionDate: 2, amount: '30' },
            { merchant: 'ba', transactionDate: 1, amount: '20' }
          ],
          sortBy: 'SORT_BY_AMOUNT',
          sortOrder: 'DESC',
          filter: ''
        }
      };

      const source = m.hot(' --^-a-b-c-|', inputs);
      const subs = '           ^-------!';
      const expected = m.cold('--x-y-z-|', outputs as StreamData<Partial<Transaction>[]>);

      const destination = source.pipe(transactionReducer());
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );

  it(
    'transactionFilterMap should filter payload based on provided propertie',
    marbles(m => {
      const inputs: { [key: string]: StreamData<Partial<Transaction>[]> } = {
        a: {
          action: 'ADD',
          payload: [
            { merchant: 'acx', transactionDate: 3, amount: '10' },
            { merchant: 'aca', transactionDate: 2, amount: '30' },
            { merchant: 'ba', transactionDate: 1, amount: '20' }
          ],
          filter: 'c'
        },
        b: {
          filter: 'ca'
        },
        c: {
          action: 'ADD',
          payload: [
            { merchant: 'acx', transactionDate: 3, amount: '10' },
            { merchant: 'aca', transactionDate: 2, amount: '30' },
            { merchant: 'ba', transactionDate: 1, amount: '20' }
          ],
          filter: 'b'
        }
      };
      const outputs: { [key: string]: StreamData<Partial<Transaction>[]> } = {
        x: {
          action: 'ADD',
          payload: [
            { merchant: 'acx', transactionDate: 3, amount: '10' },
            { merchant: 'aca', transactionDate: 2, amount: '30' }
          ],
          sortBy: 'SORT_BY_DATE',
          sortOrder: 'DESC',
          filter: 'c'
        },
        y: {
          action: 'UPDATE',
          payload: [{ merchant: 'aca', transactionDate: 2, amount: '30' }],
          sortBy: 'SORT_BY_DATE',
          sortOrder: 'DESC',
          filter: 'ca'
        },
        z: {
          action: 'ADD',
          payload: [{ merchant: 'ba', transactionDate: 1, amount: '20' }],
          sortBy: 'SORT_BY_DATE',
          sortOrder: 'DESC',
          filter: 'b'
        }
      };

      const source = m.hot(' --^-a-b-c-|', inputs);
      const subs = '           ^-------!';
      const expected = m.cold('--x-y-z-|', outputs as StreamData<Partial<Transaction>[]>);

      const destination = source.pipe(transactionReducer(), transactionFilterMap());
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );

  it(
    'transactionSortMap should sort transaction based on provided properties',
    marbles(m => {
      const inputs: { [key: string]: StreamData<Partial<Transaction>[]> } = {
        a: {
          action: 'ADD',
          payload: [
            { merchant: 'aca', transactionDate: 2, amount: '30' },
            { merchant: 'ba', transactionDate: 1, amount: '20' },
            { merchant: 'acx', transactionDate: 3, amount: '10' }
          ]
        },
        b: {
          sortBy: 'SORT_BY_AMOUNT',
          sortOrder: 'ASC'
        },
        c: {
          sortBy: 'SORT_BY_BENEFICIARY',
          sortOrder: 'DESC'
        }
      };
      const outputs: { [key: string]: StreamData<Partial<Transaction>[]> } = {
        x: {
          action: 'ADD',
          payload: [
            { merchant: 'acx', transactionDate: 3, amount: '10' },
            { merchant: 'aca', transactionDate: 2, amount: '30' },
            { merchant: 'ba', transactionDate: 1, amount: '20' }
          ],
          sortBy: 'SORT_BY_DATE',
          sortOrder: 'DESC',
          filter: ''
        },
        y: {
          action: 'UPDATE',
          payload: [
            { merchant: 'acx', transactionDate: 3, amount: '10' },
            { merchant: 'ba', transactionDate: 1, amount: '20' },
            { merchant: 'aca', transactionDate: 2, amount: '30' }
          ],
          sortBy: 'SORT_BY_AMOUNT',
          sortOrder: 'ASC',
          filter: ''
        },
        z: {
          action: 'UPDATE',
          payload: [
            { merchant: 'ba', transactionDate: 1, amount: '20' },
            { merchant: 'acx', transactionDate: 3, amount: '10' },
            { merchant: 'aca', transactionDate: 2, amount: '30' }
          ],
          sortBy: 'SORT_BY_BENEFICIARY',
          sortOrder: 'DESC',
          filter: ''
        }
      };

      const source = m.hot(' --^-a-b-c-|', inputs);
      const subs = '           ^-------!';
      const expected = m.cold('--x-y-z-|', outputs as StreamData<Partial<Transaction>[]>);

      const destination = source.pipe(
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
        ),
        transactionSortMap()
      );
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );
});
