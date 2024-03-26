import { Controller, Get, Param } from '@nestjs/common';
import { TaskHistoryService } from './history.service';

@Controller('history/task')
export class TaskHistoryController {
  constructor(private readonly historyService: TaskHistoryService) {}

  @Get(':taskId')
  async find(@Param('taskId') taskId: number) {
    return this.historyService.find(taskId);
  }

  @Get()
  async findAll() {
    return this.historyService.findAll();
  }
}
