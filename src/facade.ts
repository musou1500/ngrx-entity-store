import {Observable} from 'rxjs';
import {EntityId, Entity, Schemas} from './models';
import {Injectable, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  importEntity,
  importEntities,
  removeEntity,
  removeEntities,
} from './actions';
import {SCHEMAS} from './tokens';

@Injectable({providedIn: 'root'})
export class EntityFacade {
  constructor(
    private store: Store<any>,
    @Inject(SCHEMAS) private schemas: Schemas,
  ) {}

  importEntity(name: string, entity: Entity): void {
    this.store.dispatch(importEntity({name, entity}));
  }

  importEntities(name: string, entities: Entity[]): void {
    this.store.dispatch(importEntities({name, entities}));
  }

  removeEntity(name: string, id: EntityId): void {
    this.store.dispatch(removeEntity({name, id}));
  }

  removeEntities(name: string, ids: EntityId[]): void {
    this.store.dispatch(removeEntities({name, ids}));
  }

  getById<T extends Entity>(name: string, ids: EntityId): Observable<T> {}
  getByIds<T extends Entity>(name: string, ids: EntityId[]): Observable<T[]> {}
}
