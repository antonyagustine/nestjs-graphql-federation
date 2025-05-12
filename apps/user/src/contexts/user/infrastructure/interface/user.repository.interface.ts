import { IUserResponse } from "./user-readonly.repository.interface";

export interface IUserCreateInput {
  userId: string;
  email: string;
  name: string;
}

export interface IUserRepository {
  create(user: IUserCreateInput): Promise<IUserResponse>;
}
