import { Directive, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "userId")')
export class UserDTO {
  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  email: string;
}

@ObjectType()
export class UserCreateResponseDTO {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  error?: string;
}
