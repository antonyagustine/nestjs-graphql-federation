import { ApplicationMapper } from "@todo/libs/core-domain/mappers/application-mapper";

import { TodoDTO } from "../dto/task.output";
import { TodoModel } from "../../infrastructure/database/models/todo.model";

export class TodoModelToDTOMapper implements ApplicationMapper<TodoModel, TodoDTO> {
  toDto(todo: TodoModel): TodoDTO {
    return {
      todoId: todo.todoId,
      title: todo.title,
      description: todo.description,
      assigneeId: todo.assigneeId,
      createdInfo: {
        createdAt: todo.createdAt,
        user: todo.createdBy
      },
      isCompleted: todo.isCompleted,
      modifiedInfo: {
        user: todo.updatedBy,
        modifiedAt: todo.updatedAt
      }
    };
  }
}
