import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TasksController } from './tasks.controller';
import { TaskListModule } from 'src/task-lists/task-lists.module';
import { TaskHistoryModule } from './history/history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TaskListModule,
    TaskHistoryModule,
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TaskModule {}
