import { Module } from '@nestjs/common';
import { TaskHistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskHistory } from './history.entity';
import { TaskHistoryManager } from './tasks.dbsubscriber';
import { TaskHistoryController } from './history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskHistory])],
  providers: [TaskHistoryService, TaskHistoryManager],
  controllers: [TaskHistoryController],
  exports: [TaskHistoryService],
})
export class TaskHistoryModule {}
