import { Repository } from "typeorm";
import { Injectable, Scope } from "@nestjs/common";

import { TodoModel } from "../../models/todo.model";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable({ scope: Scope.TRANSIENT })
export class TodoReadonlyRepository {
  constructor(
    @InjectRepository(TodoModel) private todoRepo: Repository<TodoModel>
  ) {}

  getTodoById(todoId: string): Promise<TodoModel | null> {
    return this.todoRepo.findOneBy({ todoId })
  }

  getTodoList(
    pagination: { page: number; limit: number },
    filter?: { [key: string]: any },
    sorting?: { field: string; direction: 'ASC' | 'DESC'; }[]
  ): Promise<TodoModel[]> {
    if (pagination.limit <= 0) {
      return Promise.resolve([]);
    }

    const query = this.todoRepo.createQueryBuilder("todo");

    if (filter) {
      Object.keys(filter).forEach((key) => {
        query.andWhere(`todo.${key} = :${key}`, { [key]: filter[key] });
      });
    }

    if (sorting) {
      sorting.forEach(({ field, direction }) => {
        query.addOrderBy(`todo.${field}`, direction);
      });
    }

    return query
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit)
      .getMany();
  }
}