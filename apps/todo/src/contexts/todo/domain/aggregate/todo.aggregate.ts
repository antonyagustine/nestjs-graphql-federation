import { AggregateRoot } from '@todo/libs/core-domain';

import { Todo } from '../entities/todo';
import { IAggregateProps } from './task-aggregate.props';
import { Assignee } from '../value-objects/assignee/assignee';

export class TodoAggregate extends AggregateRoot<IAggregateProps> {
  private _todo: Todo

  private _assignee: Assignee

  private constructor(props: IAggregateProps) {
    super(props);
    this._todo = props.todo;
    this._assignee = props.assignee;
  }

  static create(props: IAggregateProps): TodoAggregate {
    return new TodoAggregate(props);
  }

  get todo(): Todo {
    return this._todo;
  }

  get assignee(): Assignee {
    return this._assignee;
  }

  complete(): void {
    this.todo.complete();
  }

  update(title: string, description: string): void {
    
    this.todo.update(title, description);
  }
}
