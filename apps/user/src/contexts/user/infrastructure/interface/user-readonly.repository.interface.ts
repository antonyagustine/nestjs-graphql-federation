import { UserModel } from "../database/models/user.model";

export interface IUserResponse extends Omit<UserModel, 'updatedAt' | 'updatedBy'> {
  updatedAt?: Date;
  updatedBy?: string;
}

export interface IUserReadonlyRepository {
  getUserById(userId: string): Promise<IUserResponse | null>;

  getUserList(
    filter?: { [key: string]: any },
    sorting?: { field: string; direction: 'ASC' | 'DESC' }[],
    pagination?: { page: number; limit: number }
  ): Promise<IUserResponse[]>;
}
