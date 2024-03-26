import { HistoryActionType } from '@shared/dtos';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export { HistoryActionType };

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: HistoryActionType,
  })
  actionType: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ length: 128, nullable: true })
  tableName: string;

  @Column({ length: 20, default: '' })
  fieldName: string;

  @Column({ length: 128, default: '' })
  oldValue: string;

  @Column({ length: 128, default: '' })
  newValue: string;

  @Column()
  recordId: number;
}
