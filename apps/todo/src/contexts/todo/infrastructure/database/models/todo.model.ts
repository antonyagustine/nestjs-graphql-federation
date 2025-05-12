import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { AssigneeModel } from './assignee.model';

@Entity({ name: 'todo' })
export class TodoModel {
  @PrimaryGeneratedColumn('uuid')
  todoId: string;

  @Column({ length: 255 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 255 })
  createdBy: string;

  @Column({ length: 255, nullable: true })
  updatedBy: string;

  @Column('uuid')
  assigneeId: string;

  @ManyToOne(() => AssigneeModel, assignee => assignee.userId)
  @JoinColumn({ name: "assigneeId" })
  assignee: AssigneeModel;
}
