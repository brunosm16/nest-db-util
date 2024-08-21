export interface ComparativeBooleanClauses {
  is?: boolean | null;
  isNot?: boolean | null;
}

export interface ComparativeRangeClauses<ClauseType>
  extends ComparativeBooleanClauses {
  eq?: ClauseType;
  gt?: ClauseType;
  gte?: ClauseType;
  in?: ClauseType[];
  lt?: ClauseType;
  lte?: ClauseType;
  neq?: ClauseType;
  notIn?: ClauseType[];
}

export interface ComparativeLikeClauses
  extends ComparativeRangeClauses<string> {
  iLike?: string;
  like?: string;
  notILike?: string;
  notLike?: string;
}

export type ComparativeClauses<ClauseType> = ClauseType extends
  | boolean
  | never
  | undefined
  ? ComparativeBooleanClauses
  : ClauseType extends string
    ? ComparativeLikeClauses
    : ComparativeRangeClauses<ClauseType>;

export type ComparativeClausesKeys<ClauseType> =
  keyof ComparativeClauses<ClauseType>;

export type ComparativeClausesKeyValue<T> = {
  [K in keyof T]: ComparativeClauses<T[K]>;
};
