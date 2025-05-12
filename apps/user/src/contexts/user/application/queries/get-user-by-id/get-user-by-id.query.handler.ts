import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDTO } from '../../dto/user.output';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { UserModelToDTOMapper } from '../../mappers/user.mapper';
import { UserReadonlyRepository } from '../../../infrastructure/database/repositories/queries/user-readonly.repository';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery> {
  private readonly logger = new Logger(GetUserByIdQueryHandler.name);

  constructor(
    private readonly mapper: UserModelToDTOMapper,
    private readonly userReadonlyRepo: UserReadonlyRepository,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<UserDTO> {
    try {
      const user = await this.userReadonlyRepo.getUserById(query.userId)

      if (!user) {
        this.logger.warn(`User with ID ${query.userId} not found`);
        throw new Error(`User with ID ${query.userId} not found`);
      }

      return this.mapper.toDto(user);
    } catch (error) {
      this.logger.error('Error fetching user by ID', error);
      throw new Error('Error fetching user by ID', { cause: error });
    }
  }
}