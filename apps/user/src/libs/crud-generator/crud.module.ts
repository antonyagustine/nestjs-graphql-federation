import { Module, DynamicModule } from '@nestjs/common';

import { BaseQueryResolver } from './resolvers/base-query.resolver';
import { BaseMutationResolver } from './resolvers/base-mutation.resolver';
import { MutationResolverOptions, QueryResolverOptions } from './crud-resolver.interface';

@Module({})
export class CrudResolverModule {
  static forQuery<TDto, TFilter>(options: QueryResolverOptions<TDto, TFilter>): DynamicModule {
    const QueryResolver = BaseQueryResolver(options.dto, options);
    return {
      module: CrudResolverModule,
      providers: [...QueryResolver]
    };
  }

  static forMutation<TCreateInput, TUpdateInput, TDeleteInput, TCreateOutput, TUpdateOutput, TDeleteOutput>(
    options: MutationResolverOptions<TCreateInput, TUpdateInput, TDeleteInput, TCreateOutput, TUpdateOutput, TDeleteOutput>
  ): DynamicModule {
    const MutationResolver = BaseMutationResolver(options);
    return {
      module: CrudResolverModule,
      providers: [...MutationResolver],
    };
  }
}