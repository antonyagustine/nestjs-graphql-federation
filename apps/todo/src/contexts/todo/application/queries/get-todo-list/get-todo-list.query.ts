import { TodoFilterInput, TodoPaginationInput, TodoSortingInput } from "../../dto/task-list.dto";

export class GetTodoListQuery {
  constructor(
    public readonly pagination: TodoPaginationInput,
    public readonly filter?: TodoFilterInput,
    public readonly sorting?: TodoSortingInput[]
  ) {}
}
