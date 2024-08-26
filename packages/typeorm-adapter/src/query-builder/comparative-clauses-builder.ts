import type { Repository } from 'typeorm';

import { QueryBuilderAbstract } from './query-builder.abstract';

export class ComparativeClausesBuilder<T> extends QueryBuilderAbstract<T> {
  private numberOfParameters: number = 0;

  constructor(public readonly repository: Repository<T>) {
    super(repository);
  }

  private getLastParameter(): string {
    return `params${this.numberOfParameters}`;
  }

  private incrementNumberOfParameters(): number {
    this.numberOfParameters += 1;
    return this.numberOfParameters;
  }
}
