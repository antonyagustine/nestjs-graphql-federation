import { Resolver, ResolveReference } from '@nestjs/graphql';

import { UserDTO } from '../../application/dto/user.output';

@Resolver(() => UserDTO)
export class UserResolver {
  @ResolveReference()
  resolveReference(reference: { __typename: string; userId: string }): UserDTO {
    return { userId: reference.userId, name: 'Reference User', email: 'test@gmail.com' };
  }
}
