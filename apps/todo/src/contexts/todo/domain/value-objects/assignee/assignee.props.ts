import { UniqueIdentifier } from "@todo/libs/core-domain";

export interface IAssigneeProps {
  assigneeId: UniqueIdentifier;
  name: string;
  email: string;
}
