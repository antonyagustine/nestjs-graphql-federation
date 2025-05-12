import { Module } from '@nestjs/common';

import { TodoService } from './application/services/todo.service';
import { TodoModelToDTOMapper } from './application/mappers/todo.mapper';
import { DatabaseModule } from './infrastructure/database/database.module';
import { TodoGraphQLModule } from './interfaces/graphql-api/graphql.module';
import { CreateTodoCommandHandler } from './application/commands/create-todo/todo-create-command.handler';
import { GetTodoListQueryHandler } from './application/queries/get-todo-list/get-todo-list.query.handler';
import { GetTodoByIdQueryHandler } from './application/queries/get-todo-by-id/get-todo-by-id.query.handler';

@Module({
  imports: [
    DatabaseModule,
    TodoGraphQLModule
  ],
  providers: [
    TodoService,
    TodoModelToDTOMapper,
    GetTodoListQueryHandler,
    GetTodoByIdQueryHandler,
    CreateTodoCommandHandler
  ]
})
export class TodoModule {}
