import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UnitOfWorkModule } from "@todo/libs/unit-of-work";

import { TodoModel } from "./models/todo.model";
import { AssigneeModel } from "./models/assignee.model";
import { TodoDomainToDBModelMapper } from "../mappers/domain.mapper";
import { TodoAggregateRepository } from "./repositories/todo-aggregate.repository";
import { TodoReadonlyRepository } from "./repositories/queries/todo-readonly.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoModel,
      AssigneeModel
    ]),
    UnitOfWorkModule
  ],
  providers: [
    TodoDomainToDBModelMapper,
    TodoAggregateRepository,
    TodoReadonlyRepository
  ],
  exports: [
    TodoAggregateRepository,
    TodoReadonlyRepository
  ]
})
export class DatabaseModule { }
