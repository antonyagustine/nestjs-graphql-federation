import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ITodoPersistenceModel } from '@todo/contexts/todo/infrastructure/mappers/interface/domain.interface';

import { CreateTodoCommand } from './todo-create.command';
import { TodoService } from '../../services/todo.service';
import { TodoCreateResponseDTO } from '../../dto/task.output';

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private readonly todoService: TodoService
  ) {}

  async execute(command: CreateTodoCommand): Promise<TodoCreateResponseDTO> {
    const todo = command.payload as ITodoPersistenceModel;
    const response = await this.todoService.create(todo)

    return response;
  }
}