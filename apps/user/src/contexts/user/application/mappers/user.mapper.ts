
import { ApplicationMapper } from "@user/libs/core-domain/mappers/application-mapper";

import { UserDTO } from "../dto/user.output";
import { UserModel } from "../../infrastructure/database/models/user.model";
import { IUserResponse } from "../../infrastructure/interface/user-readonly.repository.interface";

export class UserModelToDTOMapper implements ApplicationMapper<UserModel, UserDTO> {
  toDto(user: IUserResponse): UserDTO {
    return {
      userId: user.userId,
      name: user.name,
      email: user.email
    }
  }
}
