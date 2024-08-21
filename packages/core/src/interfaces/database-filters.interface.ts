import type { ComparativeClauses } from './comparative-clauses.interface';
import type { ConditionalOperators } from './conditional-operators.interface';

export type DatabaseFilters<T> = ComparativeClauses<T> &
  ConditionalOperators<T>;
