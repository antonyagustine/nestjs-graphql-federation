import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
// import { CreateTodoInput } from './dto/create-todo.input';
// import { UpdateTodoInput } from './dto/update-todo.input';
// import { TodoModel } from './models/todo.model';

import { TodoDTO } from '../../application/dto/task.output';
import { CreateTodoInput } from '../../application/dto/create-todo.input';
import { CreateTodoCommand } from '../../application/commands/create-todo/todo-create.command';
// import {
//   CreateTodoCommand,
//   UpdateTodoCommand,
//   DeleteTodoCommand,
// } from './commands/todo.commands';
// import {
//   GetAllTodosQuery,
//   GetTodoQuery,
// } from './queries/todo.queries';

@Resolver(() => TodoDTO)
export class TodoResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  // @Query(() => [TodoModel])
  // async todos(): Promise<TodoModel[]> {
  //   return this.queryBus.execute(new GetAllTodosQuery());
  // }

  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello World!';
  }

  // @Query(() => TodoModel)
  // async todo(@Args('todoId') todoId: string): Promise<TodoModel> {
  //   return this.queryBus.execute(new GetTodoQuery(todoId));
  // }

  // @Mutation(() => TodoModel)
  // async updateTodo(@Args('input') input: UpdateTodoInput): Promise<TodoModel> {
  //   return this.commandBus.execute(new UpdateTodoCommand(input));
  // }

  // @Mutation(() => Boolean)
  // async deleteTodo(@Args('todoId') todoId: string): Promise<boolean> {
  //   return this.commandBus.execute(new DeleteTodoCommand(todoId));
  // }

  // @ResolveField(() => UserType, { name: 'creator' })
  // async resolveCreator(@Parent() todo: TodoOutput): Promise<UserType> {
  //   return await this.userService.findById(todo.creatorId);
  // }
}