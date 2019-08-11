import {normalize} from 'normalizr';
import {createReducer, on, ActionReducer} from '@ngrx/store';
import {importEntity, EntityActionsUnion, removeEntity} from './actions';
import {EntityState, EntityMap, Schemas, Entity, EntityId} from './models';

export const initialState: EntityState = {};

function createEntityMap(entity: Entity): EntityMap {
  return {
    [entity.id]: entity,
  };
}

function addEntity(
  state: EntityState,
  name: string,
  entity: Entity,
): EntityState {
  return {
    ...state,
    [name]: {
      ...(state[name] || {}),
      ...createEntityMap(entity),
    },
  };
}

function addEntities(state: EntityState, name: string, entities: Entity[]) {
  return entities.reduce((s, entity) => addEntity(s, name, entity), state);
}

function rmEntity(state: EntityState, name: string, id: EntityId) {
  if (!state[name] || !state[name][id]) {
    return state;
  }

  const newEntityMap = {...state[name]};
  if (id in newEntityMap) {
    delete newEntityMap[id];
  }

  return {
    ...state,
    [name]: newEntityMap,
  };
}

export function createEntityReducer<T extends Schemas>(schemas: T) {
  return createReducer<EntityState, EntityActionsUnion>(
    initialState,
    on(importEntity, (state, {entity}) => {
      const {entities}: {entities: EntityState} = normalize(
        entity,
        schemas.articles,
      );

      return Object.entries(entities).reduce(
        (s, [name, entityMap]) =>
          addEntities(s, name, Object.values(entityMap)),
        state,
      );
    }),
    on(removeEntity, (state, {id, name}) => rmEntity(state, name, id)),
  );
}

export function metaReducer(reducer: ActionReducer<any, any>) {
  return (action: any, state: any) => {
    if (!('entityMeta' in action)) {
      return reducer(action, state);
    }

    const entityActions = action.entityMeta.actions;
    const newState = entityActions.reduce(
      (s: any, action: EntityActionsUnion) => reducer(action, s),
      state,
    );
    return reducer(action, newState);
  };
}
