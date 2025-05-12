import { ObjectType, Field, Int, InputType, registerEnumType } from '@nestjs/graphql';

import { UserDTO } from './user.output';

@InputType()
export class UserPaginationInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

@InputType()
export class UserFilterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortDirection, { name: 'UserSortDirection' });

@InputType()
export class UserSortingInput {
  @Field()
  field: string;

  @Field(() => SortDirection)
  direction: SortDirection;
}


@ObjectType()
export class PaginatedUsers {
  @Field(() => [UserDTO])
  items: UserDTO[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Boolean)
  hasNextPage: boolean;
}
