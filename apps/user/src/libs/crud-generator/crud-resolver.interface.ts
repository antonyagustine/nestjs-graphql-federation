import { Type } from '@nestjs/common';
import { IQuery, ICommand } from '@nestjs/cqrs';
import { Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortDirection, { name: 'SortDirection' });

@InputType()
export class SortingInput {
  @Field()
  field: string;

  @Field(() => SortDirection)
  direction: SortDirection;
}

@ObjectType()
export class PaginatedResult {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Boolean)
  hasNextPage: boolean;
}

export interface QueryResolverOptions<TDto, TFindFilterInput = undefined> {
  name: string;
  dto: Type<TDto>;
  isAbstract?: boolean;
  filterInput?: Type<TFindFilterInput>;
  queries: {
    findAll?: new (
      filter?: TFindFilterInput,
      sorting?: SortingInput[],
      pagination?: PaginationInput
    ) => IQuery;
    findById?: new (id: string) => IQuery;
  };
}

export interface MutationResolverOptions<TCreateInput, TUpdateInput, TDeleteInput, TCreateOutput, TUpdateOutput, TDeleteOutput = boolean> {
  name: string;
  isAbstract?: boolean;
  mutation: {
    create?: {
      nullable?: boolean;
      input: TCreateInput;
      output: TCreateOutput;
      command: new (input: TCreateInput) => ICommand,
    }
    update?: {
      nullable?: boolean;
      input: TUpdateInput;
      output: TUpdateOutput;
      command: new (input: TUpdateInput) => ICommand,
    }
    delete?: {
      nullable?: boolean;
      input: TDeleteInput;
      output: TDeleteOutput;
      command: new (input: TDeleteInput) => ICommand,
    }
  };
}
