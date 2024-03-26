import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionType, History } from './history.entity';
import { Injectable, Logger } from '@nestjs/common';
import { Task } from 'src/tasks/tasks.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  logger = new Logger(HistoryService.name);

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
