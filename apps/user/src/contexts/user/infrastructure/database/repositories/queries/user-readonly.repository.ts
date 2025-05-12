import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Scope } from "@nestjs/common";

import { UserModel } from "../../models/user.model";
import { IUserReadonlyRepository, IUserResponse } from "../../../interface/user-readonly.repository.interface";

@Injectable({ scope: Scope.TRANSIENT })
export class UserReadonlyRepository implements IUserReadonlyRepository {
  constructor(
    @InjectRepository(UserModel) private userRepo: Repository<UserModel>
  ) {}

  getUserById(userId: string): Promise<IUserResponse | null> {
    return this.userRepo.findOneBy({ userId })
  }

  getUserList(
    filter?: { [key: string]: any },
    sorting?: { field: string; direction: 'ASC' | 'DESC'; }[],
    pagination: { page: number; limit: number } = { page: 1, limit: 10 },
  ): Promise<IUserResponse[]> {
    if (pagination.limit <= 0) {
      return Promise.resolve([]);
    }

    const query = this.userRepo.createQueryBuilder("user");

    if (filter) {
      Object.keys(filter).forEach((key) => {
        query.andWhere(`user.${key} = :${key}`, { [key]: filter[key] });
      });
    }

    if (sorting) {
      sorting.forEach(({ field, direction }) => {
        query.addOrderBy(`user.${field}`, direction);
      });
    }

    return query
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit)
      .getMany();
  }
}