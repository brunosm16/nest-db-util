import type { ComparativeClausesKeyValue } from './comparative-clauses.interface';

export type ConditionalOperators<T> = {
  and?: ComparativeClausesKeyValue<T>[];
  or?: ComparativeClausesKeyValue<T>[];
};
