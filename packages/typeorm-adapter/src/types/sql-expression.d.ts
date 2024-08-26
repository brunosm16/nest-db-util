import type { ObjectLiteral } from 'typeorm';

export type SqlExpression = {
  expression: string;
  parameters: ObjectLiteral;
};
