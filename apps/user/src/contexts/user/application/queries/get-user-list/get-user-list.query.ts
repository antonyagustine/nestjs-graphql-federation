import { UserFilterInput, UserPaginationInput, UserSortingInput } from "../../dto/user-list.dto";

export class GetUserListQuery {
  constructor(
    public readonly filter?: UserFilterInput,
    public readonly sorting?: UserSortingInput[],
    public readonly pagination?: UserPaginationInput,
  ) {}
}
