import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskList } from 'src/task-lists/task-lists.entity';

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @Column({ type: 'enum', enum: Priority })
  priority: Priority;

  @Column({ unique: true })
  order: number;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks)
  @JoinColumn({ name: 'taskListId' })
  taskList: TaskList;
}
