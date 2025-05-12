import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { TodoDTO } from '../../application/dto/task.output';
import { GetTodoListQuery } from '../../application/queries/get-todo-list/get-todo-list.query';
import { GetTodoByIdQuery } from '../../application/queries/get-todo-by-id/get-todo-by-id.query';
import { TodoFilterInput, TodoPaginationInput, TodoSortingInput } from '../../application/dto/task-list.dto';

@Resolver()
export class TodoQuery {
  constructor(private readonly queryBus: QueryBus) { }

  @Query(() => [TodoDTO], { nullable: true })
  async todoList(
    @Args('pagination', { nullable: true }) pagination: TodoPaginationInput = { page: 1, limit: 10 },
    @Args('filter', { nullable: true }) filter?: TodoFilterInput,
    @Args('sorting', { nullable: true, type: () => [TodoSortingInput] }) sorting?: TodoSortingInput[]
  ): Promise<TodoDTO[] | null> {
    return this.queryBus.execute(new GetTodoListQuery(pagination, filter, sorting));
  }

  @Query(() => TodoDTO, { nullable: true })
  async getTodoById(@Args('todoId') todoId: string): Promise<TodoDTO> {
    return this.queryBus.execute(new GetTodoByIdQuery(todoId));
  }
}
