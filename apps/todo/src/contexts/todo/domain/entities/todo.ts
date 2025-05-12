import { randomUUID } from "node:crypto";

import { Entity, UniqueIdentifier } from "@todo/libs/core-domain";

import { ITodoProps } from "./todo.props";

export class Todo extends Entity<ITodoProps> {
  private readonly _todoId: UniqueIdentifier;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _isCompleted: boolean;
  private readonly _createdBy: string;

  constructor(props: ITodoProps) {
    super(props);
    this._todoId = props.todoId ?? new UniqueIdentifier(randomUUID());
    this._title = props.title;
    this._description = props.description ?? null;
    this._isCompleted = props.isCompleted ?? false;
    this._createdBy = props.createdBy ?? "";
  }

  get todoId(): UniqueIdentifier {
    return this._todoId;
  }

  get title(): string {
    return this._title
  }

  get description(): string {
    return this._description
  }

  get isCompleted(): boolean {
    return this._isCompleted;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  public static create(props: ITodoProps): Todo {
    return new Todo(props);
  }

  complete(): void {
    this.props.isCompleted = true;
    this.touch();
  }

  update(title: string, description: string): void {
    this.props.title = title;
    this.props.description = description;
    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}
