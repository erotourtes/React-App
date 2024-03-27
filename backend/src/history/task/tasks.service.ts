import {
  BaseHistoryService,
  BaseHistoryServiceTemplate,
} from '../base/history.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/tasks.entity';
import { Repository, getMetadataArgsStorage } from 'typeorm';
import { History } from '../history.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskHistoryService extends BaseHistoryServiceTemplate<Task> {
  historyService: BaseHistoryService<Task>;

  constructor(
    @InjectRepository(History)
    historyRepository: Repository<History>,
  ) {
    super();
    this.historyService = new BaseHistoryService<Task>(
      historyRepository,
      getMetadataArgsStorage().tables.find(
        (table) => table.target === Task,
      ).name,
    );
  }
}
