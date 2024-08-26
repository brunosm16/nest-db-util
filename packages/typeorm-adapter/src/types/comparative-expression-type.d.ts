import type { ObjectLiteral } from 'typeorm';

export type ComparativeExpressionType = {
  expression: string;
  parameters: ObjectLiteral;
};
