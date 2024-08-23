import type { Repository } from 'typeorm';

import { USER_ENTITY_COLUMNS_FIELDS_MAP } from '../../test/constants/user-entity-columns';
import { UserEntity } from '../../test/entities';
import { sqliteDatabaseTestFactory } from '../../test/factories';
import { QueryBuilderAbstract } from './query-builder.abstract';

interface SutTypes<T> {
  queryBuilderMock: AbstractQueryBuilderMock<T>;
}

class AbstractQueryBuilderMock<T> extends QueryBuilderAbstract<T> {
  constructor(readonly repository: Repository<T>) {
    super(repository);
  }
}

const makeAbstractQueryBuilderMock = <T>(repository: Repository<T>) =>
  new AbstractQueryBuilderMock(repository);

const makeSut = <T>(repository: Repository<T>): SutTypes<T> => {
  const queryBuilderMock = makeAbstractQueryBuilderMock(repository);
  return { queryBuilderMock };
};

describe('Query Builder Abstract', () => {
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

  test.each(USER_ENTITY_COLUMNS_FIELDS_MAP)(
    `Column name '$column' should correspond to field name '$field'`,
    ({ column, field }) => {
      const { queryBuilderMock } = makeSut(userTestEntityRepository);

      const fieldName = field as keyof UserEntity;

      const expectedField = `"${column}"`;

      const columnName = queryBuilderMock.getColumnNameByField(fieldName);

      expect(columnName).toEqual(expectedField);
    }
  );

  it('Should return field name for non-existing column', async () => {
    const { queryBuilderMock } = makeSut(userTestEntityRepository);

    const fieldName = 'non-existing-field';

    const expectedFieldName = `"${fieldName}"`;

    const columnName =
      // @ts-expect-error: Testing non-existing field
      queryBuilderMock.getColumnNameByField(fieldName);

    expect(columnName).toEqual(expectedFieldName);
  });
});
