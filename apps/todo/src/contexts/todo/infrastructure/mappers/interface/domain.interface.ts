import { TodoModel } from "../../database/models/todo.model";

export interface ITodoPersistenceModel
  extends Omit<
    TodoModel,
    | "createdAt"
    | "updatedAt"
    | "createdBy"
    | "updatedBy"
    | 'assignee'
  > {
    createdBy: string;
    assigneeEmail?: string;
    assigneeName?: string;
  }
