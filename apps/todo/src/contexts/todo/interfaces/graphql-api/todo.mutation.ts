import { CommandBus } from '@nestjs/cqrs';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { TodoCreateResponseDTO } from '../../application/dto/task.output';
import { CreateTodoInput } from '../../application/dto/create-todo.input';
import { CreateTodoCommand } from '../../application/commands/create-todo/todo-create.command';

@Resolver()
export class TodoMutation {
  constructor(
    private readonly commandBus: CommandBus,
  ) { }

  @Mutation(() => TodoCreateResponseDTO)
  async createTodo(@Args('input') input: CreateTodoInput): Promise<TodoCreateResponseDTO> {
    return this.commandBus.execute(new CreateTodoCommand(input));
  }
}
