import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDTO } from '../../dto/user.output';
import { GetUserListQuery } from './get-user-list.query';
import { UserModelToDTOMapper } from '../../mappers/user.mapper';
import { UserReadonlyRepository } from '../../../infrastructure/database/repositories/queries/user-readonly.repository';

@QueryHandler(GetUserListQuery)
export class GetUserListQueryHandler implements IQueryHandler<GetUserListQuery> {
  private readonly logger = new Logger(GetUserListQueryHandler.name);

  constructor(
    private readonly mapper: UserModelToDTOMapper,
    private readonly userReadonlyRepo: UserReadonlyRepository,
  ) {}

  async execute(query: GetUserListQuery): Promise<UserDTO[]> {
    try {
      const { pagination, filter, sorting } = query;
      const userList = await this.userReadonlyRepo.getUserList(
        filter,
        sorting,
        pagination
      );

      return userList.map((user) => this.mapper.toDto(user));
    } catch (error) {
      this.logger.error('Error fetching user list', error);
      throw new Error('Error fetching user list', { cause: error });
    }
  }
}