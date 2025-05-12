import { Todo } from "../entities/todo";
import { Assignee } from "../value-objects/assignee/assignee";

export interface IAggregateProps {
  todo: Todo;
  assignee: Assignee;
}
