import { ObjectType, Field, Int, InputType, registerEnumType } from '@nestjs/graphql';

import { TodoDTO } from './task.output';

@InputType()
export class TodoPaginationInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

@InputType()
export class TodoFilterInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortDirection, { name: 'SortDirection' });

@InputType()
export class TodoSortingInput {
  @Field()
  field: string;

  @Field(() => SortDirection)
  direction: SortDirection;
}


@ObjectType()
export class PaginatedTodos {
  @Field(() => [TodoDTO])
  items: TodoDTO[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Boolean)
  hasNextPage: boolean;
}
