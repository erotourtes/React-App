import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskList } from 'src/task-lists/task-lists.entity';
import { TaskPriority } from '@shared/dtos';

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

  @Column({ type: 'enum', enum: TaskPriority })
  priority: TaskPriority;

  @Column({ unique: true })
  order: number;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks)
  @JoinColumn({ name: 'taskListId' })
  taskList: TaskList;
}
