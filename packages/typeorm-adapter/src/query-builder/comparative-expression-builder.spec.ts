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

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
          'isAdmin',
          true,
          // @ts-expect-error: Testing non-existing clause
          'any_clause'
        );
      } catch (error: any) {
        expect(error?.message).toEqual(
          "Invalid comparative operator: 'any_clause'"
        );
      }
    });

    it('Should throw an error for invalid boolean value', () => {
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
          'isAdmin',
          // @ts-expect-error: Testing invalid boolean value
          'any_value',
          'is'
        );
      } catch (error: any) {
        expect(error?.message).toEqual('Invalid boolean value: any_value');
      }
    });

    it(`Should correctly create a boolean clause for 'IS TRUE'`, () => {
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const clause = comparativeClausesBuilderMock.buildComparativeExpression(
        'isAdmin',
        true,
        'is'
      );

      expect(clause).toEqual({
        expression: `"is_admin" IS TRUE`,
        parameters: {},
      });
    });

    it(`Should correctly create a boolean clause for 'IS FALSE'`, () => {
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const clause = comparativeClausesBuilderMock.buildComparativeExpression(
        'isAdmin',
        false,
        'is'
      );

      expect(clause).toEqual({
        expression: `"is_admin" IS FALSE`,
        parameters: {},
      });
    });

    it(`Should correctly create a boolean clause for 'IS NULL'`, () => {
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const clause = comparativeClausesBuilderMock.buildComparativeExpression(
        'isAdmin',
        null,
        'is'
      );

      expect(clause).toEqual({
        expression: `"is_admin" IS NULL`,
        parameters: {},
      });
    });

    it(`Should correctly create a boolean clause for 'IS NOT TRUE'`, () => {
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const clause = comparativeClausesBuilderMock.buildComparativeExpression(
        'isAdmin',
        true,
        'isNot'
      );

      expect(clause).toEqual({
        expression: `"is_admin" IS NOT TRUE`,
        parameters: {},
      });
    });

    it(`Should correctly create a boolean clause for 'IS NOT FALSE'`, () => {
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const clause = comparativeClausesBuilderMock.buildComparativeExpression(
        'isAdmin',
        false,
        'isNot'
      );

      expect(clause).toEqual({
        expression: `"is_admin" IS NOT FALSE`,
        parameters: {},
      });
    });

    it(`Should correctly create a boolean clause for 'IS NOT NULL'`, () => {
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      const clause = comparativeClausesBuilderMock.buildComparativeExpression(
        'isAdmin',
        null,
        'isNot'
      );

      expect(clause).toEqual({
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

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
          'id',
          // @ts-expect-error: Testing invalid array value
          'not_array_value',
          'in'
        );
      } catch (error: any) {
        expect(error?.message).toEqual(
          'Invalid array for membership operator. Array needs to have at least one item'
        );
      }
    });

    it(`Should throw an error for invalid array for 'notIn' clause`, () => {
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
          'id',
          // @ts-expect-error: Testing invalid array value
          'not_array_value',
          'notIn'
        );
      } catch (error: any) {
        expect(error?.message).toEqual(
          'Invalid array for membership operator. Array needs to have at least one item'
        );
      }
    });

    it(`Should thrown an error for empty array for 'in' clause`, () => {
      const { comparativeClausesBuilderMock } = makeSut(
        userTestEntityRepository
      );

      try {
        comparativeClausesBuilderMock.buildComparativeExpression(
          'id',
          [],
          'in'
        );
      } catch (error: any) {
        expect(error?.message).toEqual(
          'Invalid array for membership operator. Array needs to have at least one item'
        );
      }
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
  });
});
