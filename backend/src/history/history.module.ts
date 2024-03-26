import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './history.entity';
import { HistoryController } from './history.controller';
import { TaskHistoryDbSubscriber } from './task/tasks.dbsubscriber';
import { TaskListHistoryDbSubscriber } from './task-list/task-lists.dbsubscriber';
import { TaskHistoryService } from './task/tasks.service';
import { TaskListHistoryService } from './task-list/task-list.service';
import { HistoryService } from './history.service';
import { TaskHistoryController } from './task/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [
    HistoryService,

    TaskHistoryService,
    TaskHistoryDbSubscriber,

    TaskListHistoryDbSubscriber,
    TaskListHistoryService,
  ],
  controllers: [HistoryController, TaskHistoryController],
  exports: [],
})
export class HistoryModule {}
