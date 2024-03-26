import {
  BaseHistoryService,
  BaseHistoryServiceTemplate,
} from '../base/history.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getMetadataArgsStorage } from 'typeorm';
import { History } from '../history.entity';
import { TaskList } from 'src/task-lists/task-lists.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskListHistoryService extends BaseHistoryServiceTemplate<TaskList> {
  historyService: BaseHistoryService<TaskList>;

  constructor(
    @InjectRepository(History)
    historyRepository: Repository<History>,
  ) {
    super();
    this.historyService = new BaseHistoryService<TaskList>(
      historyRepository,
      getMetadataArgsStorage().tables.find(
        (table) => table.target === TaskList,
      ).name,
    );
  }
}
