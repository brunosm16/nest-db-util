import type { Repository } from 'typeorm';

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

  it('Should get column name by field', async () => {
    const { queryBuilderMock } = makeSut(userTestEntityRepository);

    const columName = queryBuilderMock.getColumnNameByField('id');
    expect(columName).toEqual('"id"');
  });
});
