import { EntityManager } from "typeorm";
import { Inject, Injectable, Logger, Scope } from "@nestjs/common";

import { TYPES } from "@user/libs/unit-of-work/const/types.const";
import { IUnitOfWork } from "@user/libs/unit-of-work/unit-of-work.interface";

import { UserDomainToDBModelMapper } from "../../mappers/domain.mapper";
import { IUserResponse } from "../../interface/user-readonly.repository.interface";
import { IUserCreateInput, IUserRepository } from "../../interface/user.repository.interface";

@Injectable({ scope: Scope.TRANSIENT })
export class UserRepository implements IUserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    private readonly entityManager: EntityManager,
    private readonly mapper: UserDomainToDBModelMapper,
    @Inject(TYPES.UnitOfWork) private readonly uow: IUnitOfWork
  ) {}

  async create(user: IUserCreateInput): Promise<IUserResponse> {
    try {
      const userModel = this.mapper.toPersistence(user);
      const userRepo = this.entityManager.getRepository(userModel.constructor.name);
      const response = await userRepo.save(userModel) as IUserResponse;

      return response
    } catch (error) {
      this.logger.error("UserRepository: Create user failed", error.message);
      throw new Error("UserRepository: Create user failed", { cause: error });
    }
  }
}
