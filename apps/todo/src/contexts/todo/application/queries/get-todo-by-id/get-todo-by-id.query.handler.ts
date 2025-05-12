import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TodoReadonlyRepository } from '@todo/contexts/todo/infrastructure/database/repositories/queries/todo-readonly.repository';

import { TodoDTO } from '../../dto/task.output';
import { GetTodoByIdQuery } from './get-todo-by-id.query';
import { TodoModelToDTOMapper } from '../../mappers/todo.mapper';

@QueryHandler(GetTodoByIdQuery)
export class GetTodoByIdQueryHandler implements IQueryHandler<GetTodoByIdQuery> {
  private readonly logger = new Logger(GetTodoByIdQueryHandler.name);

  constructor(
    private readonly mapper: TodoModelToDTOMapper,
    private readonly todoReadonlyRepo: TodoReadonlyRepository,
  ) {}

  async execute(query: GetTodoByIdQuery): Promise<TodoDTO> {
    try {
      const todo = await this.todoReadonlyRepo.getTodoById(query.todoId)

      if (!todo) {
        this.logger.warn(`Todo with ID ${query.todoId} not found`);
        throw new Error(`Todo with ID ${query.todoId} not found`);
      }

      return this.mapper.toDto(todo);
    } catch (error) {
      this.logger.error('Error fetching todo by ID', error);
      throw new Error('Error fetching todo by ID', { cause: error });
    }
  }
}