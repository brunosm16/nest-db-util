export const COMPARATIVE_RANGE_OPERATORS_MAP: Record<string, string> = {
  eq: '=',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  neq: '!=',
};

export const COMPARATIVE_LIKE_OPERATORS_MAP: Record<string, string> = {
  iLike: 'ILIKE',
  like: 'LIKE',
  notILike: 'NOT ILIKE',
  notIn: 'NOT IN',
  notLike: 'NOT LIKE',
};

export const COMPARATIVE_MEMBERSHIP_OPERATORS_MAP: Record<string, string> = {
  in: 'IN',
  notIn: 'NOT IN',
};

export const COMPARATIVE_BOOLEAN_OPERATORS_MAP: Record<string, string> = {
  is: 'IS',
  isNot: 'IS NOT',
};

export const COMPARATIVE_OPERATORS = {
  ...COMPARATIVE_BOOLEAN_OPERATORS_MAP,
  ...COMPARATIVE_LIKE_OPERATORS_MAP,
  ...COMPARATIVE_MEMBERSHIP_OPERATORS_MAP,
  ...COMPARATIVE_RANGE_OPERATORS_MAP,
};
