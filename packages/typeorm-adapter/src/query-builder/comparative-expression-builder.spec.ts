import type { Repository } from 'typeorm';

import { UserEntity } from '../../test/entities';
import { sqliteDatabaseTestFactory } from '../../test/factories';
import { ComparativeClausesBuilder } from './comparative-expression-builder';

interface SutTypes<T> {
  comparativeClausesBuilderMock: ComparativeClausesBuilder<T>;
}

const makeComparativeClausesBuilderMock = <T>(repository: Repository<T>) =>
  new ComparativeClausesBuilder<T>(repository);

const makeSut = <T>(repository: Repository<T>): SutTypes<T> => {
  const comparativeClausesBuilderMock =
    makeComparativeClausesBuilderMock(repository);
  return { comparativeClausesBuilderMock };
};

describe('Comparative Clauses Builder', () => {
  const testingDatabase = sqliteDatabaseTestFactory();

  let userTestEntityRepository: Repository<UserEntity> = null;

  beforeEach(async () => {
    await testingDatabase.initialize();

    userTestEntityRepository =
      testingDatabase.getRepositoryByEntity(UserEntity);
  });

  afterEach(async () => {
    await testingDatabase.closeDatabase();
  });

  describe('Boolean Expressions', () => {
    it('Should throw an error for non-existing clause', () => {
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      let errorMessage = '';

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const arrayCountries = ['Brazil', 'Canada', 'Netherlands'];

      const clause = comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const arrayCountries = ['Brazil', 'Canada', 'Netherlands'];

      const clause = comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const expression =
        comparativeClausesBuilderMock.buildComparativeExpression(
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
