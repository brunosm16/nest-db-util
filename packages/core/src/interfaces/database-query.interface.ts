import type { DatabaseFilters } from './database-filters.interface';
import type { Pagination } from './pagination.interface';
import type { Sorting } from './sorting.interface';

export interface DatabaseQuery<T> {
  filters?: DatabaseFilters<T>;
  pagination?: Pagination;
  sort?: Sorting<T> | Sorting<T>[];
}
