import type { ComparativeClausesKeys } from '@nest-db-util/core';
import type { Repository } from 'typeorm';

import type { EntityValues, SqlExpression } from '../types';

import {
  COMPARATIVE_CLAUSES,
  OPERATORS_BY_CLAUSE_CATEGORY,
} from '../constants';
import {
  BooleanExpressionsEnum,
  ComparativeClausesCategoriesEnum,
} from '../enums';
import { isValidArray } from '../utils';
import { QueryBuilderAbstract } from './query-builder.abstract';

export class ComparativeClausesBuilder<
  BuilderEntity,
> extends QueryBuilderAbstract<BuilderEntity> {
  private parametersArray: unknown[] = [];

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

  private buildMembershipExpression<Field extends keyof BuilderEntity>(
    column: string,
    value: EntityValues<BuilderEntity, Field>,
    membershipOperator: string
  ): SqlExpression {
    if (!isValidArray(value)) {
      throw new Error(
        'Invalid array for membership operator. Array needs to have at least one item'
      );
    }

    const parameterOrder = this.pushParameterAndGetOrder(value);

    return {
      expression: `${column} ${membershipOperator} (:...${parameterOrder})`,
      parameters: {
        [parameterOrder]: value,
      },
    };
  }

  private checkIfOperatorExistsByClauseCategory(
    comparativeOperator: string,
    clauseCategory: ComparativeClausesCategoriesEnum
  ): boolean {
    const clausesOperatorsMap = OPERATORS_BY_CLAUSE_CATEGORY[clauseCategory];

    const operators = Object.values(clausesOperatorsMap);

    return operators.includes(comparativeOperator);
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

  private getOperatorByClause(clause: string): string {
    const operator = COMPARATIVE_CLAUSES[clause];

    if (!operator) {
      throw new Error(`Invalid comparative operator: '${clause}'`);
    }

    return operator;
  }

  private isBooleanOperator(operator: string): boolean {
    return this.checkIfOperatorExistsByClauseCategory(
      operator,
      ComparativeClausesCategoriesEnum.BOOLEAN
    );
  }

  private isMembershipOperator(operator: string): boolean {
    return this.checkIfOperatorExistsByClauseCategory(
      operator,
      ComparativeClausesCategoriesEnum.MEMBERSHIP
    );
  }

  private pushParameterAndGetOrder(parameter: unknown): string {
    const currentParameterOrder = this.parametersArray.length;
    this.parametersArray.push(parameter);
    return `param${currentParameterOrder}`;
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

    if (this.isMembershipOperator(comparativeOperator)) {
      return this.buildMembershipExpression(column, value, comparativeOperator);
    }
    return {
      expression: '',
      parameters: {},
    };
  }
}
