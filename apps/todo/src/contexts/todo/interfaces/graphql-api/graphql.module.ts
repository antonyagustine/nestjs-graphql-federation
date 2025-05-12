import { Module } from '@nestjs/common';

import { TodoQuery } from './todo.query';
import { TodoResolver } from './todo.resolver';
import { TodoMutation } from './todo.mutation';

@Module({
  imports: [],
  providers: [
    TodoResolver,
    TodoQuery,
    TodoMutation
  ],
})
export class TodoGraphQLModule { }
