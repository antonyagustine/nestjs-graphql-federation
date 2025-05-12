import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreatedInfo {
  @Field()
  user: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class ModifiedInfo {
  @Field()
  user: string

  @Field()
  modifiedAt: Date
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "userId")')
export class Assignee {
  @Field(() => ID)
  @Directive('@external')
  userId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;
}

@ObjectType()
@Directive('@key(fields: "todoId")')
export class TodoDTO {
  @Field(() => ID)
  todoId: string;

  @Field()
  title: string;

  @Field()
  description?: string;

  @Field()
  isCompleted: boolean;

  @Field(() => CreatedInfo, { nullable: true })
  createdInfo: CreatedInfo;

  @Field(() => ModifiedInfo, { nullable: true })
  modifiedInfo: ModifiedInfo;

  @Field(() => String, { nullable: true })
  assigneeId?: string;

  @Field(() => Assignee, { nullable: true })
  assignee?: Assignee;
}

@ObjectType()
export class TodoCreateResponseDTO {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  todoId?: string;

  @Field({ nullable: true })
  error?: string;
}
