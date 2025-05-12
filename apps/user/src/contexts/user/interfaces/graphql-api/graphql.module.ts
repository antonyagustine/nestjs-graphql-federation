import { Module } from '@nestjs/common';

import { CrudResolverModule } from '@user/libs/crud-generator';

import { UserFilterInput } from '../../application/dto/user-list.dto';
import { CreateUserInput } from '../../application/dto/create-user.input';
import { UserCreateResponseDTO, UserDTO } from '../../application/dto/user.output';
import { GetUserByIdQuery } from '../../application/queries/get-user-by-id/get-user-by-id.query';
import { GetUserListQuery } from '../../application/queries/get-user-list/get-user-list.query';
import { CreateUserCommand } from '../../application/commands/create-user/user-create.command';

@Module({
  imports: [
    CrudResolverModule.forQuery({
      name: 'User',
      dto: UserDTO,
      isAbstract: false,
      filterInput: UserFilterInput,
      queries: {
        findById: GetUserByIdQuery,
        findAll: GetUserListQuery
      }
    }),
    CrudResolverModule.forMutation({
      name: 'User',
      isAbstract: false,
      mutation: {
        create: {
          command: CreateUserCommand,
          input: CreateUserInput,
          output: UserCreateResponseDTO
        }
      }
    })
  ],
  providers: []
})
export class UserGraphQLModule { }
