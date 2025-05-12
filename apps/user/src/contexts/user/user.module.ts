import { Module } from '@nestjs/common';

import { UserService } from './application/services/user.service';
import { UserModelToDTOMapper } from './application/mappers/user.mapper';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserGraphQLModule } from './interfaces/graphql-api/graphql.module';
import { CreateUserCommandHandler } from './application/commands/create-user/user-create-command.handler';
import { GetUserListQueryHandler } from './application/queries/get-user-list/get-user-list.query.handler';
import { GetUserByIdQueryHandler } from './application/queries/get-user-by-id/get-user-by-id.query.handler';

@Module({
  imports: [
    DatabaseModule,
    UserGraphQLModule,
  ],
  providers: [
    UserService,
    UserModelToDTOMapper,
    GetUserListQueryHandler,
    GetUserByIdQueryHandler,
    CreateUserCommandHandler
  ]
})
export class UserModule {}
