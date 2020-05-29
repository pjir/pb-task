export interface SortByOption {
  value: string;
  name: string;
  arialLabel: string;
}

export type SORT_BY_ORDER_TYPE = 'ASC' | 'DESC';

export interface SortByValue {
  sortBy: string;
  sortOrder: SORT_BY_ORDER_TYPE;
}
