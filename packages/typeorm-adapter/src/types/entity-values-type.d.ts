type EntityBooleanValues = false | true;
type EntityValuesByKey<Entity, Field extends keyof Entity> =
  | Entity[Field]
  | Entity[Field][];

export type EntityValues<Entity, Field extends keyof Entity> =
  | EntityBooleanValues
  | EntityValuesByKey<Entity, Field>
  | null;
