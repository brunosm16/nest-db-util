import { ComparativeClausesCategoriesEnum } from '../enums/comparative-clauses.enum';

export const COMPARATIVE_RANGE_CLAUSES_OPERATORS_MAP: Record<string, string> = {
  eq: '=',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  neq: '!=',
};

export const COMPARATIVE_LIKE_CLAUSES_OPERATORS_MAP: Record<string, string> = {
  iLike: 'ILIKE',
  like: 'LIKE',
  notILike: 'NOT ILIKE',
  notIn: 'NOT IN',
  notLike: 'NOT LIKE',
};

export const COMPARATIVE_MEMBERSHIP_CLAUSES_OPERATORS_MAP: Record<
  string,
  string
> = {
  in: 'IN',
  notIn: 'NOT IN',
};

export const COMPARATIVE_BOOLEAN_CLAUSES_OPERATORS_MAP: Record<string, string> =
  {
    is: 'IS',
    isNot: 'IS NOT',
  };

export const OPERATORS_BY_CLAUSE_CATEGORY = {
  [ComparativeClausesCategoriesEnum.BOOLEAN]:
    COMPARATIVE_BOOLEAN_CLAUSES_OPERATORS_MAP,
  [ComparativeClausesCategoriesEnum.LIKE]:
    COMPARATIVE_LIKE_CLAUSES_OPERATORS_MAP,
  [ComparativeClausesCategoriesEnum.MEMBERSHIP]:
    COMPARATIVE_MEMBERSHIP_CLAUSES_OPERATORS_MAP,
  [ComparativeClausesCategoriesEnum.RANGE]:
    COMPARATIVE_RANGE_CLAUSES_OPERATORS_MAP,
};

export const COMPARATIVE_CLAUSES = {
  ...COMPARATIVE_BOOLEAN_CLAUSES_OPERATORS_MAP,
  ...COMPARATIVE_LIKE_CLAUSES_OPERATORS_MAP,
  ...COMPARATIVE_MEMBERSHIP_CLAUSES_OPERATORS_MAP,
  ...COMPARATIVE_RANGE_CLAUSES_OPERATORS_MAP,
};
