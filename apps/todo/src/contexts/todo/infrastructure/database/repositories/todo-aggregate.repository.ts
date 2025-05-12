import { EntityManager } from "typeorm";
import { Inject, Injectable, Logger, Scope } from "@nestjs/common";

import { IAggregateRepository } from "@todo/libs/core-domain";
import { TYPES } from "@todo/libs/unit-of-work/const/types.const";
import { IUnitOfWork } from "@todo/libs/unit-of-work/unit-of-work.interface";

import { TodoModel } from "../models/todo.model";
import { AssigneeModel } from "../models/assignee.model";
import { TodoDomainToDBModelMapper } from "../../mappers/domain.mapper";
import { TodoAggregate } from "../../../domain/aggregate/todo.aggregate";
import { ITodoPersistenceModel } from "../../mappers/interface/domain.interface";

@Injectable({ scope: Scope.TRANSIENT })
export class TodoAggregateRepository implements IAggregateRepository<TodoAggregate, ITodoPersistenceModel> {

  private readonly logger = new Logger(TodoAggregateRepository.name);

  constructor(
    private readonly entityManager: EntityManager,
    private readonly mapper: TodoDomainToDBModelMapper,
    @Inject(TYPES.UnitOfWork) private readonly uow: IUnitOfWork
  ) {}

  async reconstruct(todo: ITodoPersistenceModel): Promise<TodoAggregate> {
    this.logger.debug("Reconstructing TodoAggregate from persistence model");

    const [todoModel, assigneeModel] = await Promise.all([
      this.entityManager.findOneBy(
        TodoModel,
        { title: todo.title, assigneeId: todo.assigneeId }
      ),
      this.entityManager.findOneBy(
        AssigneeModel,
        { userId: todo.assigneeId }
      )
    ])

    if (todoModel) {
      throw new Error("Todo already exists")
    }

    if (!assigneeModel) {
      throw new Error("Assignee not found")
    }

    const todoPersistenceModel: ITodoPersistenceModel = {
      ...todo,
      assigneeEmail: assigneeModel.email,
      assigneeName: assigneeModel.name,
    }

    const todoAggregate = this.mapper.toDomain(todoPersistenceModel)
    return todoAggregate;
  }

  async mutate(todoAggregate: TodoAggregate): Promise<void> {
    try {
      const todoModel = this.mapper.toPersistence(todoAggregate);
      this.logger.debug("Mutating TodoAggregate to persistence model");

      // NOTE can add more transactions here if needed
      this.uow.add(async (manager: EntityManager) => {
        const todoRepository = manager.getRepository(TodoModel);

        await Promise.all([
          todoRepository.save(todoModel),
          // NOTE: Multiple save calls are not atomic, so we need to handle this in the transaction
        ]);
      })

      await this.uow.commit()

      this.logger.log("TodoAggregate mutated successfully");
    } catch (error) {
      this.logger.error("Error mutating TodoAggregate", error);
      throw new Error("Failed to mutate TodoAggregate");
    }
  }
}
