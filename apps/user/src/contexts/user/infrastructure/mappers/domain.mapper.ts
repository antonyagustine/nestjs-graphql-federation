import { UniqueIdentifier } from "@user/libs/core-domain";
import { InfrastructureMapper } from "@user/libs/core-domain/mappers/infrastructure-mapper";

import { IUserPersistenceModel } from "../interface/domain.interface";
import { IUserCreateInput } from "../interface/user.repository.interface";

export class UserDomainToDBModelMapper extends InfrastructureMapper<IUserCreateInput, IUserPersistenceModel> {
  toDomain(userModel: IUserPersistenceModel): IUserCreateInput {
    throw new Error("Method not implemented.");
  }

  toPersistence(user: IUserCreateInput): IUserPersistenceModel {
    const userModel: IUserPersistenceModel = {
      userId: new UniqueIdentifier(user.userId).id.toString(),
      email: user.email,
      name: user.name,
      createdBy: "test.dev@user.com"
    }
    
    return userModel
  }
}
