import { UserModel } from "../database/models/user.model";

export interface IUserPersistenceModel extends Omit<UserModel, "createdAt" | "updatedAt" | "updatedBy"> {
  createdAt?: Date;
}
