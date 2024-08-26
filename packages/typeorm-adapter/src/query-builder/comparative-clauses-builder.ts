import type { SqlExpression } from '@/types';
import type { EntityValues } from '@/types/entity-values-type';
import type { ComparativeClausesKeys } from '@nest-db-util/core';
import type { Repository } from 'typeorm';

import {
  COMPARATIVE_BOOLEAN_CLAUSES_MAP,
  COMPARATIVE_CLAUSES,
} from '@/constants';
import { BooleanExpressionsEnum } from '@/enums';

import { QueryBuilderAbstract } from './query-builder.abstract';

export class ComparativeClausesBuilder<
  BuilderEntity,
> extends QueryBuilderAbstract<BuilderEntity> {
  private numberOfParameters: number = 0;

  constructor(public readonly repository: Repository<BuilderEntity>) {
    super(repository);
  }

  private buildBooleanClause<Field extends keyof BuilderEntity>(
    column: string,
    value: EntityValues<BuilderEntity, Field>
  ): SqlExpression {
    const booleanExpression = this.getBooleanExpressionByValue(value);

    return {
      expression: `${column} ${booleanExpression}`,
      parameters: {},
    };
  }

  private getBooleanExpressionByValue<Field extends keyof BuilderEntity>(
    value: EntityValues<BuilderEntity, Field>
  ) {
    if (value === true) {
      return BooleanExpressionsEnum.IS_TRUE;
    }

    if (value === false) {
      return BooleanExpressionsEnum.IS_FALSE;
    }

    if (value === null) {
      return BooleanExpressionsEnum.IS_NULL;
    }

    throw new Error(`Invalid boolean value: ${value}`);
  }

  private getComparativeClause(inputClause: string): string {
    const comparativeClause = COMPARATIVE_CLAUSES[inputClause];

    if (!comparativeClause) {
      throw new Error(`Invalid comparative clause: '${inputClause}'`);
    }

    return comparativeClause;
  }

  private getLastParameter(): string {
    return `params${this.numberOfParameters}`;
  }

  private incrementNumberOfParameters(): number {
    this.numberOfParameters += 1;
    return this.numberOfParameters;
  }

  private isBooleanClause(comparativeClause: string): boolean {
    const booleanClauses = Object.keys(COMPARATIVE_BOOLEAN_CLAUSES_MAP);

    return booleanClauses.includes(comparativeClause);
  }

  public buildComparativeClause<Field extends keyof BuilderEntity>(
    field: Field,
    value: EntityValues<BuilderEntity, Field>,
    inputClause: ComparativeClausesKeys<BuilderEntity[Field]>
  ): SqlExpression {
    const column = this.getColumnNameByField(field);
    const comparativeClause = this.getComparativeClause(inputClause as string);

    if (this.isBooleanClause(comparativeClause)) {
      return this.buildBooleanClause(column, value);
    }
    return {
      expression: '',
      parameters: {},
    };
  }
}
