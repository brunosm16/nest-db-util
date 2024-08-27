import type { ComparativeClausesKeys } from '@nest-db-util/core';
import type { Repository } from 'typeorm';

import type { EntityValues, SqlExpression } from '../types';

import {
  COMPARATIVE_BOOLEAN_CLAUSES_OPERATORS_MAP,
  COMPARATIVE_CLAUSES,
} from '../constants';
import { BooleanExpressionsEnum } from '../enums';
import { QueryBuilderAbstract } from './query-builder.abstract';

export class ComparativeClausesBuilder<
  BuilderEntity,
> extends QueryBuilderAbstract<BuilderEntity> {
  private numberOfParameters: number = 0;

  constructor(public readonly repository: Repository<BuilderEntity>) {
    super(repository);
  }

  private buildBooleanExpression<Field extends keyof BuilderEntity>(
    column: string,
    value: EntityValues<BuilderEntity, Field>,
    booleanOperator: string
  ): SqlExpression {
    const booleanValue = this.getBooleanValue(value);

    return {
      expression: `${column} ${booleanOperator} ${booleanValue}`,
      parameters: {},
    };
  }

  private getBooleanValue<Field extends keyof BuilderEntity>(
    value: EntityValues<BuilderEntity, Field>
  ) {
    if (value === true) {
      return BooleanExpressionsEnum.TRUE;
    }

    if (value === false) {
      return BooleanExpressionsEnum.FALSE;
    }

    if (value === null) {
      return BooleanExpressionsEnum.NULL;
    }

    throw new Error(`Invalid boolean value: ${value}`);
  }

  private getLastParameter(): string {
    return `params${this.numberOfParameters}`;
  }

  private getOperatorByClause(clause: string): string {
    const operator = COMPARATIVE_CLAUSES[clause];

    if (!operator) {
      throw new Error(`Invalid comparative operator: '${clause}'`);
    }

    return operator;
  }

  private incrementNumberOfParameters(): number {
    this.numberOfParameters += 1;
    return this.numberOfParameters;
  }

  private isBooleanOperator(comparativeOperator: string): boolean {
    const booleanClauses = Object.values(
      COMPARATIVE_BOOLEAN_CLAUSES_OPERATORS_MAP
    );

    return booleanClauses.includes(comparativeOperator);
  }

  public buildComparativeExpression<Field extends keyof BuilderEntity>(
    field: Field,
    value: EntityValues<BuilderEntity, Field>,
    clause: ComparativeClausesKeys<BuilderEntity[Field]>
  ): SqlExpression {
    const column = this.getColumnNameByField(field);
    const comparativeOperator = this.getOperatorByClause(clause as string);

    if (this.isBooleanOperator(comparativeOperator)) {
      return this.buildBooleanExpression(column, value, comparativeOperator);
    }
    return {
      expression: '',
      parameters: {},
    };
  }
}
