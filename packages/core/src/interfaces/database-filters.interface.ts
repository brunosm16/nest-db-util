import type { ComparativeClausesKeyValue } from './comparative-clauses.interface';
import type { ConditionalOperators } from './conditional-operators.interface';

export type DatabaseFilters<T> = ComparativeClausesKeyValue<T> &
  ConditionalOperators<T>;
