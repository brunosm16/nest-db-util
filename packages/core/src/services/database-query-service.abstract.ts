import type { DatabaseQuery, FindManyResponse } from '@/interfaces';

export abstract class DatabaseQueryServiceAbstract<T> {
  protected makeFindManyResponse(
    data: T[],
    count: number
  ): FindManyResponse<T> {
    return { count, data };
  }

  abstract createMany(dto: T[]): Promise<T[]>;

  abstract createOne(dto: T): Promise<T>;

  abstract deleteMany(query: DatabaseQuery<T>): Promise<number>;

  abstract deleteOne(query: DatabaseQuery<T>): Promise<T | void>;

  abstract findById(id: number | string): Promise<T | undefined>;

  abstract findOne(query: DatabaseQuery<T>): Promise<T | undefined>;

  abstract getById(id: number | string): Promise<T>;

  abstract getMany(query: DatabaseQuery<T>): Promise<FindManyResponse<T>>;

  abstract getOne(query: DatabaseQuery<T>): Promise<T>;

  abstract updateMany(query: DatabaseQuery<T>, dto: T): Promise<number>;

  abstract updateOne(query: DatabaseQuery<T>, dto: T): Promise<T>;
}
