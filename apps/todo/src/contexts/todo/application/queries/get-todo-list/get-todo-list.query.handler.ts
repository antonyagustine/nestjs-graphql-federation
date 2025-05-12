import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TodoReadonlyRepository } from '@todo/contexts/todo/infrastructure/database/repositories/queries/todo-readonly.repository';

import { TodoDTO } from '../../dto/task.output';
import { GetTodoListQuery } from './get-todo-list.query';
import { TodoModelToDTOMapper } from '../../mappers/todo.mapper';

@QueryHandler(GetTodoListQuery)
export class GetTodoListQueryHandler implements IQueryHandler<GetTodoListQuery> {
  private readonly logger = new Logger(GetTodoListQueryHandler.name);

  constructor(
    private readonly mapper: TodoModelToDTOMapper,
    private readonly todoReadonlyRepo: TodoReadonlyRepository,
  ) {}

  async execute(query: GetTodoListQuery): Promise<TodoDTO[]> {
    try {
      const { pagination, filter, sorting } = query;
      const todoList = await this.todoReadonlyRepo.getTodoList(
        pagination,
        filter,
        sorting
      );

      return todoList.map((todo) => this.mapper.toDto(todo));
    } catch (error) {
      this.logger.error('Error fetching todo by ID', error);
      throw new Error('Error fetching todo by ID', { cause: error });
    }
  }
}