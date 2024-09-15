import type { Repository } from 'typeorm';

import type { UserEntity } from '../../test/entities';

import { sqliteDatabaseTestFactory } from '../../test/factories';
import { ComparativeExpressionBuilder } from './comparative-expression-builder';

interface SutTypes<T> {
  ComparativeExpressionBuilderMock: ComparativeExpressionBuilder<T>;
}

const makeComparativeExpressionBuilderMock = <T>(repository: Repository<T>) =>
  new ComparativeExpressionBuilder<T>(repository);

const makeSut = <T>(repository: Repository<T>): SutTypes<T> => {
  const ComparativeExpressionBuilderMock =
    makeComparativeExpressionBuilderMock(repository);
  return { ComparativeExpressionBuilderMock };
};

describe('Comparative Clauses Builder', () => {
  const testingDatabase = sqliteDatabaseTestFactory();

  let userTestEntityRepository: Repository<UserEntity> = null;

  beforeEach(async () => {
    await testingDatabase.initialize();

    userTestEntityRepository =
      testingDatabase.getRepositoryByEntity('UserEntity');
  });

  afterEach(async () => {
    await testingDatabase.closeDatabase();
  });

  describe('Boolean Expressions', () => {
    it('Should throw an error for non-existing clause', () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'isAdmin',
          true,
          // @ts-expect-error: Testing non-existing clause
          'any_clause'
        );
      } catch (error: any) {
        errorMessage = error?.message;
      }

      expect(errorMessage).toEqual(
        "Invalid comparative operator: 'any_clause'"
      );
    });

    it('Should throw an error for invalid boolean value', () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'isAdmin',
          // @ts-expect-error: Testing invalid boolean value
          'any_value',
          'is'
        );
      } catch (error: any) {
        errorMessage = error?.message;
      }
      expect(errorMessage).toEqual('Invalid boolean value: any_value');
    });

    it(`Should correctly create a boolean clause for 'IS TRUE'`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'isAdmin',
          true,
          'is'
        );

      expect(expression).toEqual({
        expression: `"is_admin" IS TRUE`,
        parameters: {},
      });
    });

    it(`Should correctly create a boolean clause for 'IS FALSE'`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'isAdmin',
          false,
          'is'
        );

      expect(expression).toEqual({
        expression: `"is_admin" IS FALSE`,
        parameters: {},
      });
    });

    it(`Should correctly create a boolean clause for 'IS NULL'`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'isAdmin',
          null,
          'is'
        );

      expect(expression).toEqual({
        expression: `"is_admin" IS NULL`,
        parameters: {},
      });
    });

    it(`Should correctly create a boolean clause for 'IS NOT TRUE'`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'isAdmin',
          true,
          'isNot'
        );

      expect(expression).toEqual({
        expression: `"is_admin" IS NOT TRUE`,
        parameters: {},
      });
    });

    it(`Should correctly create a boolean clause for 'IS NOT FALSE'`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'isAdmin',
          false,
          'isNot'
        );

      expect(expression).toEqual({
        expression: `"is_admin" IS NOT FALSE`,
        parameters: {},
      });
    });

    it(`Should correctly create a boolean clause for 'IS NOT NULL'`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'isAdmin',
          null,
          'isNot'
        );

      expect(expression).toEqual({
        expression: `"is_admin" IS NOT NULL`,
        parameters: {},
      });
    });
  });

  describe('Membership Expressions', () => {
    it(`Should throw an error for invalid array for 'in' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'id',
          // @ts-expect-error: Testing invalid array value
          'not_array_value',
          'in'
        );
      } catch (error: any) {
        errorMessage = error?.message;
      }

      expect(errorMessage).toEqual(
        'Invalid array for membership operator. Array needs to have at least one item'
      );
    });

    it(`Should throw an error for invalid array for 'notIn' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'id',
          // @ts-expect-error: Testing invalid array value
          'not_array_value',
          'notIn'
        );
      } catch (error: any) {
        errorMessage = error?.message;
      }

      expect(errorMessage).toEqual(
        'Invalid array for membership operator. Array needs to have at least one item'
      );
    });

    it(`Should thrown an error for empty array for 'in' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'id',
          [],
          'in'
        );
      } catch (error: any) {
        errorMessage = error?.message;
      }

      expect(errorMessage).toEqual(
        'Invalid array for membership operator. Array needs to have at least one item'
      );
    });

    it(`Should thrown an error for empty array for 'notIn' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'id',
          [],
          'notIn'
        );
      } catch (error: any) {
        errorMessage = error?.message;
      }

      expect(errorMessage).toEqual(
        'Invalid array for membership operator. Array needs to have at least one item'
      );
    });

    it(`Should correctly create a membership expression for 'in' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const arrayCountries = ['Brazil', 'Canada', 'Netherlands'];

      const clause =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'country',
          arrayCountries,
          'in'
        );

      expect(clause).toEqual({
        expression: `"user_country" IN (:...param0)`,
        parameters: {
          param0: arrayCountries,
        },
      });
    });

    it(`Should correctly create a membership expression for 'in' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const arrayCountries = ['Brazil', 'Canada', 'Netherlands'];

      const clause =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'country',
          arrayCountries,
          'notIn'
        );

      expect(clause).toEqual({
        expression: `"user_country" NOT IN (:...param0)`,
        parameters: {
          param0: arrayCountries,
        },
      });
    });
  });

  describe('Comparative range clauses', () => {
    it(`Should correctly create a default expression for 'eq' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'country',
          'Brazil',
          'eq'
        );

      expect(expression).toEqual({
        expression: `"user_country" = :param0`,
        parameters: {
          param0: 'Brazil',
        },
      });
    });

    it(`Should correctly create a default expression for 'gt' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'createdAt',
          '2024-01-01',
          'gt'
        );

      expect(expression).toEqual({
        expression: `"created_at" > :param0`,
        parameters: {
          param0: '2024-01-01',
        },
      });
    });

    it(`Should correctly create a default expression for 'gte' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'socialNumber',
          12345,
          'gte'
        );

      expect(expression).toEqual({
        expression: `"social_number" >= :param0`,
        parameters: {
          param0: 12345,
        },
      });
    });

    it(`Should correctly create a default expression for 'lt' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'socialNumber',
          12345,
          'lt'
        );

      expect(expression).toEqual({
        expression: `"social_number" < :param0`,
        parameters: {
          param0: 12345,
        },
      });
    });

    it(`Should correctly create a default expression for 'lte' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'socialNumber',
          12345,
          'lte'
        );

      expect(expression).toEqual({
        expression: `"social_number" <= :param0`,
        parameters: {
          param0: 12345,
        },
      });
    });

    it(`Should correctly create a default expression for 'neq' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'socialNumber',
          12345,
          'neq'
        );

      expect(expression).toEqual({
        expression: `"social_number" != :param0`,
        parameters: {
          param0: 12345,
        },
      });
    });
  });

  describe('Comparative like clauses', () => {
    it(`Should correctly create a default expression for 'like' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'username',
          'john_doe',
          'like'
        );

      expect(expression).toEqual({
        expression: `"username" LIKE :param0`,
        parameters: {
          param0: 'john_doe',
        },
      });
    });

    it(`Should correctly create a default expression for 'iLike' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'username',
          'john_doe',
          'iLike'
        );

      expect(expression).toEqual({
        expression: `"username" ILIKE :param0`,
        parameters: {
          param0: 'john_doe',
        },
      });
    });

    it(`Should correctly create a default expression for 'notILike' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'username',
          'john_doe',
          'notILike'
        );

      expect(expression).toEqual({
        expression: `"username" NOT ILIKE :param0`,
        parameters: {
          param0: 'john_doe',
        },
      });
    });

    it(`Should correctly create a default expression for 'notLike' clause`, () => {
      const { ComparativeExpressionBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        ComparativeExpressionBuilderMock.buildComparativeExpression(
          'username',
          'john_doe',
          'notLike'
        );

      expect(expression).toEqual({
        expression: `"username" NOT LIKE :param0`,
        parameters: {
          param0: 'john_doe',
        },
      });
    });
  });
});
