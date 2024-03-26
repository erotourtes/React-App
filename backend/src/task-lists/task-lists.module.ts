import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './task-lists.entity';
import { TaskListsService } from './task-lists.service';
import { TaskListsController } from './task-lists.controller';
import { TaskModule } from 'src/tasks/tasks.module';
import { TaskListHistoryModule } from './history/history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskList]),
    forwardRef(() => TaskModule),
    TaskListHistoryModule,
  ],
  providers: [TaskListsService],
  controllers: [TaskListsController],
  exports: [TaskListsService],
})
export class TaskListModule {}
