import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionType, TaskListHistory } from './history.entity';
import { Injectable, Logger } from '@nestjs/common';
import { TaskList } from '../task-lists.entity';

@Injectable()
export class TaskListHistoryService {
  constructor(
    @InjectRepository(TaskListHistory)
    private readonly historyRepository: Repository<TaskListHistory>,
  ) {}

  logger = new Logger(TaskListHistoryService.name);

  async create(
    record: {
      actionType: ActionType;
      fieldName?: keyof TaskList;
      oldValue?: string;
      newValue?: string;
    },
    taskId: number,
  ) {
    const newRecord = this.historyRepository.create({
      ...record,
      taskList: { id: taskId },
    });
    await this.historyRepository.save(newRecord);

    this.logger.log({
      status: 'History record created',
      taskId,
      record,
    });
  }
}
