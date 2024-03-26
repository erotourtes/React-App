import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListHistoryService } from './history.service';
import { TaskListHistory } from './history.entity';
import { TaskListHistoryManager } from './task-lists.dbsubscriber';

@Module({
  imports: [TypeOrmModule.forFeature([TaskListHistory])],
  providers: [TaskListHistoryService, TaskListHistoryManager],
  exports: [TaskListHistoryService],
})
export class TaskListHistoryModule {}
