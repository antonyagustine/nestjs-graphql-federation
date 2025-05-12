import { Injectable, Logger, Scope } from "@nestjs/common";

import { UserCreateResponseDTO } from "../dto/user.output";
import { UserRepository } from "../../infrastructure/database/repositories/user.repository";
import { IUserCreateInput } from "../../infrastructure/interface/user.repository.interface";

@Injectable({ scope: Scope.TRANSIENT })
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async create(user: IUserCreateInput): Promise<UserCreateResponseDTO> {
    try {
      const userModel = await this.userRepository.create(user);

      return {
        success: true,
        userId: userModel.userId
      }
    } catch (error) {
      this.logger.error('UserService: Create user failed', error.message);
      return { success: false, error: error.message };
    }
  }
}
