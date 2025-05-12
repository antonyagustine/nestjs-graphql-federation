import { Injectable, Logger, Scope } from "@nestjs/common";

import { TodoCreateResponseDTO } from "../dto/task.output";
import { TodoAggregateRepository } from "../../infrastructure/database/repositories/todo-aggregate.repository";
import { ITodoPersistenceModel } from "../../infrastructure/mappers/interface/domain.interface";

@Injectable({ scope: Scope.TRANSIENT })
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    private readonly todoAggregateRepository: TodoAggregateRepository
  ) { }

  async create(todo: ITodoPersistenceModel): Promise<TodoCreateResponseDTO> {
    try {
      const todoModel = await this.todoAggregateRepository.reconstruct(todo);

      if (!todoModel) {
        throw new Error('Todo model reconstruction failed');
      }

      await this.todoAggregateRepository.mutate(todoModel);

      return {
        success: true,
        todoId: todoModel.todo.todoId.id.toString(),
      }
    } catch (error) {
      this.logger.error('TodoService: Create todo failed', error.message);
      return { success: false, error: error.message };
    }
  }
}
