import { Type } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver, Args } from '@nestjs/graphql';

import { PaginationInput, QueryResolverOptions, SortingInput } from '../crud-resolver.interface';

export function BaseQueryResolver<TDto, TFindFilter>(
  classRef: Type<TDto>,
  options: QueryResolverOptions<TDto, TFindFilter>
): any[] {
  const { findAll, findById } = options.queries || {};

  @Resolver({ isAbstract: options.isAbstract ?? true })
  abstract class BaseFindAllQueryResolver {
    constructor(protected readonly queryBus: QueryBus) { }

    @Query(() => [classRef], { name: `findAll${options.name}`, nullable: true, description: `Find all ${options.name?.toLowerCase()} items` })
    async findAll(
      @Args('filter', { nullable: true, type: () => options.filterInput }) filter?: TFindFilter,
      @Args('sorting', { nullable: true, type: () => [SortingInput] }) sorting?: SortingInput[],
      @Args('pagination', { nullable: true }) pagination?: PaginationInput
    ): Promise<TDto[]> {
      if (!findAll) {
        throw new Error('FindAll query is not defined in options');
      }

      return this.queryBus.execute(new findAll(filter, sorting, pagination));
    }
  }

  @Resolver({ isAbstract: options.isAbstract ?? true })
  abstract class BaseFindByIdQueryResolver {
    constructor(protected readonly queryBus: QueryBus) { }

    @Query(() => classRef, { name: `find${options.name}ById`, nullable: true })
    async findById(@Args(`${options.name.toLowerCase()}Id`) id: string): Promise<TDto | null> {
      if (!findById) {
        throw new Error('FindById query is not defined in options');
      }

      return this.queryBus.execute(new findById(id));
    }
  }

  switch (true) {
    case !!findAll && !!findById:
      return [BaseFindByIdQueryResolver, BaseFindAllQueryResolver];

    case !!findById:
      return [BaseFindByIdQueryResolver];

    case !!findAll:
      return [BaseFindAllQueryResolver];

    default:
      return [BaseFindByIdQueryResolver, BaseFindAllQueryResolver];
  }
}
