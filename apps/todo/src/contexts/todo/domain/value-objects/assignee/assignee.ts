import { UniqueIdentifier, ValueObject } from "@todo/libs/core-domain";

import { IAssigneeProps } from "./assignee.props";

export class Assignee extends ValueObject<IAssigneeProps> {
  get assigneeId(): UniqueIdentifier {
    return this.props.assigneeId;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  private constructor(props: IAssigneeProps) {
    super(props);
  }

  public static create(props: IAssigneeProps): Assignee {
    return new Assignee(props);
  }
}