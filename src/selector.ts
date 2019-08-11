import {Entity, EntityId} from './models';
import {MemoizedSelector} from '@ngrx/store';

export const storeKey = '__ngrx_entity_store__';

export interface EntitySelector {
  selectById: <T extends Entity>(id: EntityId) => MemoizedSelector<Object, T>;
  selectByIds: <T extends Entity>(
    ids: EntityId[],
  ) => MemoizedSelector<Object, T[]>;
}

