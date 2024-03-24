import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './task-lists.entity';
import { TaskListsService } from './task-lists.service';
import { TaskListsController } from './task-lists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  providers: [TaskListsService],
  controllers: [TaskListsController],
  exports: [TaskListsService],
})
export class TaskListModule {}
