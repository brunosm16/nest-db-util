import type { Repository } from 'typeorm';

export class QueryBuilderAbstract<Entity> {
  protected constructor(readonly repository: Repository<Entity>) {}

  private get connectionDrive() {
    return this.repository.manager.connection.driver;
  }

  private escapeColumn(column: string) {
    return this.connectionDrive.escape(column);
  }

  private getColumnMetadata(propertyName: string) {
    return this.entityMetadata.findColumnWithPropertyName(propertyName);
  }

  public getColumnNameByField<FieldType extends keyof Entity>(
    field: FieldType
  ) {
    const fieldString = field as string;
    const columnMetadata = this.getColumnMetadata(fieldString);
    const columnField = columnMetadata?.databasePath ?? fieldString;

    return this.escapeColumn(columnField);
  }

  protected get entityMetadata() {
    return this.repository.metadata;
  }
}
