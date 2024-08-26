import type { Repository } from 'typeorm';

import { QueryBuilderAbstract } from './query-builder.abstract';

export class ComparativeOperatorsBuilder<T> extends QueryBuilderAbstract<T> {
  constructor(public readonly repository: Repository<T>) {
    super(repository);
  }
}
