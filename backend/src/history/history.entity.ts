import { Task } from 'src/tasks/tasks.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

export enum ActionType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ActionType,
  })
  actionType: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ length: 20, default: '' })
  fieldName: string;

  @Column({ length: 100, default: '' })
  oldValue: string;

  @Column({ length: 100, default: '' })
  newValue: string;

  @ManyToOne(() => Task, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'task_id' })
  task: Task;
}
