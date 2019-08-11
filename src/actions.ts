import {createAction, props, union} from '@ngrx/store';
import {EntityId, Entity} from './models';

export const importEntity = createAction(
  '[Ngrx Entity Store] Import Entity',
  props<{name: string; entity: Entity}>(),
);

export const importEntities = createAction(
  '[Ngrx Entity Store] Import Entities',
  props<{name: string; entities: Entity[]}>(),
);

export const removeEntity = createAction(
  '[Ngrx Entity Store] Remove Entity',
  props<{name: string; id: EntityId}>(),
);

export const removeEntities = createAction(
  '[Ngrx Entity Store] Remove Entities',
  props<{name: string; ids: EntityId[]}>(),
);

const actions = union({
  importEntity,
  importEntities,
  removeEntity,
  removeEntities,
});

export type EntityActionsUnion = typeof actions;
