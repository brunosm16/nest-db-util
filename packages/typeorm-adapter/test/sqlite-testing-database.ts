/* eslint-disable no-useless-catch */

import type { Connection, ConnectionOptions, EntitySchema } from 'typeorm';

import { faker } from '@faker-js/faker';
import { createConnection } from 'typeorm';

import { UserEntity } from './entities/user.entity';

export class SQLiteTestingDatabase {
  private connection: Connection;

  constructor() {
    this.initialize();
  }

  private get databaseConfig(): ConnectionOptions {
    return {
      database: ':memory:',
      dropSchema: true,
      entities: [UserEntity],
      name: 'test-database-connection',
      synchronize: true,
      type: 'sqlite',
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
      const UserEntityRepository = this.connection.getRepository(UserEntity);

      await UserEntityRepository.clear();
    } catch (err) {
      throw err;
    }
  }

  public async closeDatabase(): Promise<void> {
    try {
      await this.connection.close();
    } catch (err) {
      throw err;
    }
  }

  public getRepositoryByEntity<T>(entityTarget: EntitySchema<T> | string) {
    return this.connection.getRepository(entityTarget);
  }

  public async initialize(): Promise<void> {
    try {
      this.connection = await createConnection({
        ...this.databaseConfig,
      });
    } catch (err) {
      throw err;
    }
  }

  public async seed(itemsAmount: number): Promise<number> {
    try {
      const UserEntityRepository = this.connection.getRepository(UserEntity);

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
    return this.connection.getRepository(UserEntity);
  }
}
