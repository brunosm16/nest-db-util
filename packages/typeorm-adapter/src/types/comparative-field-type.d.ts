type ComparativeBooleanValues = false | true;
type ComparativeEntityKeysType<Entity, K extends keyof Entity> =
  | Entity[K]
  | Entity[K][];

export type ComparativeFieldType<Entity, K extends keyof Entity> =
  | ComparativeBooleanValues
  | ComparativeEntityKeysType<Entity, K>
  | null;
