export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortNulls {
  FIRST = 'FIRST',
  LAST = 'LAST',
}

export interface Sorting<T> {
  direction: SortDirection;
  field: keyof T;
  sortNulls?: SortNulls;
}
