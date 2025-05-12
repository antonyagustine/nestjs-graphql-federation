import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UnitOfWorkModule } from "@user/libs/unit-of-work";

import { UserModel } from "./models/user.model";
import { UserRepository } from "./repositories/user.repository";
import { UserDomainToDBModelMapper } from "../mappers/domain.mapper";
import { UserReadonlyRepository } from "./repositories/queries/user-readonly.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserModel
    ]),
    UnitOfWorkModule
  ],
  providers: [
    UserDomainToDBModelMapper,
    UserRepository,
    UserReadonlyRepository,
  ],
  exports: [
    UserRepository,
    UserReadonlyRepository
  ]
})
export class DatabaseModule { }
