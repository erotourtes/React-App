import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TasksController } from './tasks.controller';
import { HistoryModule } from 'src/history/history.module';
import { TaskListModule } from 'src/task-lists/task-lists.module';
import { TaskHistoryManager } from './tasks.history';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), HistoryModule, TaskListModule],
  providers: [TasksService, TaskHistoryManager],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TaskModule {}
