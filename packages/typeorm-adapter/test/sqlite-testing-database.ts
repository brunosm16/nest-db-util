/* eslint-disable no-useless-catch */
import type { DataSourceOptions, EntityTarget } from 'typeorm';

import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

import { UserEntity } from './entities/user.entity';

export class SQLiteTestingDatabase {
  private dataSource: DataSource;

  constructor() {
    this.initialize();
  }

  private get dataSourceConfiguration() {
    return {
      database: ':memory:',
      dropSchema: true,
      entities: [UserEntity],
      synchronize: true,
      type: 'better-sqlite3',
    };
  }

  private mockUserEntity(): Partial<UserEntity> {
    return {
      isAdmin: faker.datatype.boolean(),
      socialNumber: faker.number.int(),
      username: faker.internet.userName(),
    };
  }

  public async clearDatabase(): Promise<void> {
    try {
      const UserEntityRepository = this.dataSource.getRepository(UserEntity);

      await UserEntityRepository.clear();
    } catch (err) {
      throw err;
    }
  }

  public async closeDatabase(): Promise<void> {
    try {
      await this.dataSource.destroy();
    } catch (err) {
      throw err;
    }
  }

  public getRepositoryByEntity<T>(entityTarget: EntityTarget<T>) {
    return this.dataSource.getRepository(entityTarget);
  }

  public async initialize(): Promise<void> {
    try {
      this.dataSource = new DataSource(
        this.dataSourceConfiguration as DataSourceOptions
      );

      await this.dataSource.initialize();
    } catch (err) {
      throw err;
    }
  }

  public async seed(itemsAmount: number): Promise<number> {
    try {
      const UserEntityRepository = this.dataSource.getRepository(UserEntity);

      const promises = [];

      for (let i = 0; i < itemsAmount; i += 1) {
        const entity = this.mockUserEntity();
        promises.push(UserEntityRepository.insert(entity));
      }

      const result = await Promise.all(promises);
      return result?.length;
    } catch (error) {
      throw error;
    }
  }

  public get UserEntityRepository() {
    return this.dataSource.getRepository(UserEntity);
  }
}
