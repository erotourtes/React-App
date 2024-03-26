import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { TaskList } from '../task-lists.entity';

export enum ActionType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

@Entity()
export class TaskListHistory {
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

  @Column({ length: 128, default: '' })
  oldValue: string;

  @Column({ length: 128, default: '' })
  newValue: string;

  @ManyToOne(() => TaskList, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'task_id' })
  taskList: TaskList;
}
