import { Type } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Mutation, Resolver, Args } from '@nestjs/graphql';

import { MutationResolverOptions } from '../crud-resolver.interface';

export function BaseMutationResolver<TCreateInput, TUpdateInput, TDeleteInput, TCreateOutput, TUpdateOutput, TDeleteOutput>(
  options: MutationResolverOptions<TCreateInput, TUpdateInput, TDeleteInput, TCreateOutput, TUpdateOutput, TDeleteOutput>
): any[] {

  const { create, update, delete: deleteCommand } = options.mutation || {};

  @Resolver({ isAbstract: options.isAbstract ?? true })
  abstract class BaseCreateMutationResolver {
    constructor(protected readonly commandBus: CommandBus) { }

    @Mutation(() => create?.output, { name: `create${options.name}`, nullable: create?.nullable ?? false })
    async create(@Args('input', { type: () => create?.input }) input: TCreateInput): Promise<TCreateOutput> {
      if (!create?.command) {
        throw new Error('Create command is not defined in options');
      }

      return this.commandBus.execute(new create.command(input));
    }
  }

  @Resolver({ isAbstract: options.isAbstract ?? true })
  abstract class BaseUpdateMutationResolver {
    constructor(protected readonly commandBus: CommandBus) { }

    @Mutation(() => update?.output, { name: `update${options.name}`, nullable: update?.nullable ?? false })
    async update(@Args('input', { type: () => update?.input }) input: TUpdateInput): Promise<TUpdateOutput> {
      if (!update?.command) {
        throw new Error('Update command is not defined in options');
      }

      return this.commandBus.execute(new update.command(input));
    }
  }

  @Resolver({ isAbstract: options.isAbstract ?? true })
  abstract class BaseDeleteMutationResolver {
    constructor(protected readonly commandBus: CommandBus) { }

    @Mutation(() => deleteCommand?.output, { name: `delete${options.name}`, nullable: deleteCommand?.nullable ?? false })
    async delete(@Args('input', { type: () => deleteCommand?.input }) input: TDeleteInput): Promise<TDeleteOutput> {
      if (!deleteCommand?.command) {
        throw new Error('Delete command is not defined in options');
      }

      return this.commandBus.execute(new deleteCommand.command(input));
    }
  }

  switch (true) {
    case !!create && !!update && !!deleteCommand:
      return [
        BaseCreateMutationResolver,
        BaseUpdateMutationResolver,
        BaseDeleteMutationResolver,
      ];

    case !!create && !!update:
      return [
        BaseCreateMutationResolver,
        BaseUpdateMutationResolver,
      ];

    case !!create && !!deleteCommand:
      return [
        BaseCreateMutationResolver,
        BaseDeleteMutationResolver,
      ];

    case !!update && !!deleteCommand:
      return [
        BaseUpdateMutationResolver,
        BaseDeleteMutationResolver,
      ];

    case !!create:
      return [BaseCreateMutationResolver];

    case !!update:
      return [BaseUpdateMutationResolver];

    case !!deleteCommand:
      return [BaseDeleteMutationResolver];

    default:
      return [
        BaseCreateMutationResolver,
        BaseUpdateMutationResolver,
        BaseDeleteMutationResolver,
      ]
  }
}
