import { CreateTodoInput } from "../../dto/create-todo.input";

export class CreateTodoCommand {
  constructor(public readonly payload: CreateTodoInput) { }
}
