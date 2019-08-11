import {NgModule, ModuleWithProviders} from '@angular/core';
import {Schemas} from './models';
import {SCHEMAS} from './tokens';
import {META_REDUCERS} from '@ngrx/store';
import {metaReducer} from './reducer';

@NgModule({})
export class NgrxEntityStoreModule {
  static forRoot(config: {
    schemas: Schemas;
  }): ModuleWithProviders<NgrxEntityStoreModule> {
    return {
      ngModule: NgrxEntityStoreModule,
      providers: [
        {
          provide: SCHEMAS,
          useValue: config.schemas,
        },
        {
          provide: META_REDUCERS,
          useValue: [metaReducer],
          multi: true,
        },
      ],
    };
  }
}
