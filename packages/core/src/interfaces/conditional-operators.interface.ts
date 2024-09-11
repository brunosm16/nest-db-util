import type { DatabaseFilters } from './database-filters.interface';

export type ConditionalOperators<T> = {
  and?: DatabaseFilters<T>[];
  or?: DatabaseFilters<T>[];
};
