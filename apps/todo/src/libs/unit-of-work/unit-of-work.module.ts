import { Module, Scope } from '@nestjs/common';

import { TYPES } from './const/types.const';
import { UnitOfWork } from './unit-of-work.service';

@Module({
  providers: [
    {
      provide: TYPES.UnitOfWork,
      useClass: UnitOfWork,
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [TYPES.UnitOfWork],
})
export class UnitOfWorkModule { }
