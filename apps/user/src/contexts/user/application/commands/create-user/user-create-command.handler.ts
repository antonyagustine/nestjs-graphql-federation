import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from './user-create.command';
import { UserService } from '../../services/user.service';
import { UserCreateResponseDTO } from '../../dto/user.output';
import { IUserCreateInput } from '../../../infrastructure/interface/user.repository.interface';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService
  ) {}

  async execute(command: CreateUserCommand): Promise<UserCreateResponseDTO> {
    const user = command.payload as IUserCreateInput;
    const response = await this.userService.create(user)

    return response;
  }
}
