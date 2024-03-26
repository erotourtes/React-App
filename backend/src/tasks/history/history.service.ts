import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionType, TaskHistory } from './history.entity';
import { Injectable, Logger } from '@nestjs/common';
import { Task } from 'src/tasks/tasks.entity';

@Injectable()
export class TaskHistoryService {
  constructor(
    @InjectRepository(TaskHistory)
    private readonly historyRepository: Repository<TaskHistory>,
  ) {}

  logger = new Logger(TaskHistoryService.name);

  async create(
    record: {
      actionType: ActionType;
      fieldName?: keyof Task;
      oldValue?: string;
      newValue?: string;
    },
    taskId: number,
  ) {
    const newRecord = this.historyRepository.create({
      ...record,
      task: { id: taskId },
    });
    await this.historyRepository.save(newRecord);

    this.logger.log({
      status: 'History record created',
      taskId,
      record,
    });
  }
}
