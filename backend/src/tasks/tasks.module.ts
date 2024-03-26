import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TasksController } from './tasks.controller';
import { HistoryModule } from 'src/history/history.module';
import { TaskListModule } from 'src/task-lists/task-lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), HistoryModule, TaskListModule],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [],
})
export class TaskModule {}
