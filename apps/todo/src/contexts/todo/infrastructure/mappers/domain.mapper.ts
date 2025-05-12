import { UniqueIdentifier } from "@todo/libs/core-domain";
import { InfrastructureMapper } from "@todo/libs/core-domain/mappers/infrastructure-mapper";

import { Todo } from "../../domain/entities/todo";
import { ITodoPersistenceModel } from "./interface/domain.interface";
import { TodoAggregate } from "../../domain/aggregate/todo.aggregate";
import { Assignee } from "../../domain/value-objects/assignee/assignee";

export class TodoDomainToDBModelMapper extends InfrastructureMapper<TodoAggregate, ITodoPersistenceModel> {
  toDomain(todoModel: ITodoPersistenceModel): TodoAggregate {
    return TodoAggregate.create({
      assignee: Assignee.create({
        assigneeId: new UniqueIdentifier(todoModel.assigneeId),
        email: "Test",
        name: "Test",
      }),
      todo: Todo.create({
        todoId: new UniqueIdentifier(todoModel.todoId),
        title: todoModel.title,
        description: todoModel.description ?? "",
        isCompleted: todoModel.isCompleted,
        createdBy: todoModel.createdBy ?? "test.dev@gemail.com"
      })
    });
  }

  toPersistence(domain: TodoAggregate): ITodoPersistenceModel {
    const { assignee, todo } = domain

    const todoModel: ITodoPersistenceModel = {
      todoId: todo.todoId.id.toString(),
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
      assigneeId: assignee.assigneeId.id.toString(),
      createdBy: todo.createdBy
    }

    return todoModel
  }
}
