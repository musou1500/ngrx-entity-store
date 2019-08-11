import {schema} from 'normalizr';

export type EntityId = string | number;

export interface Entity {
  id: EntityId;
}

export interface EntityMapNum {
  [id: number]: Entity;
}

export interface EntityMap extends EntityMapNum {
  [id: string]: Entity;
}

export interface EntityState {
  [name: string]: EntityMap;
}

export interface Schemas {
  [name: string]: schema.Entity<any>;
}
