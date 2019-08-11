import {InjectionToken} from '@angular/core';
import {Schemas} from './models';

export const SCHEMAS = new InjectionToken<Schemas>(
  'ngrx-entity-store: Schemas',
);
