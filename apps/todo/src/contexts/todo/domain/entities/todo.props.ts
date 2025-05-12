import { UniqueIdentifier } from "@todo/libs/core-domain";

export interface ITodoProps {
  todoId: UniqueIdentifier;
  title: string;
  description: string;
  isCompleted: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
}