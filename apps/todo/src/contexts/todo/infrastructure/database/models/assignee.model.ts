import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class AssigneeModel {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  email?: string;
}
