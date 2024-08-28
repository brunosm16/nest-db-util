import type { ComparativeClausesCategoriesEnum } from 'enums';

export type ComparativeClausesCategories =
  | ComparativeClausesCategoriesEnum.BOOLEAN
  | ComparativeClausesCategoriesEnum.LIKE
  | ComparativeClausesCategoriesEnum.MEMBERSHIP
  | ComparativeClausesCategoriesEnum.RANGE;
