type ComparativeBooleanValues = false | true;
type ComparativeEntityKeysType<Entity, Field extends keyof Entity> =
  | Entity[Field]
  | Entity[Field][];

export type ComparativeFieldType<Entity, Field extends keyof Entity> =
  | ComparativeBooleanValues
  | ComparativeEntityKeysType<Entity, Field>
  | null;
