import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { CreateTaskListDto } from '@shared/dtos';

@Controller('task-lists')
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @Get()
  async findAll() {
    return this.taskListsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateTaskListDto) {
    return this.taskListsService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskListsService.delete(id);
  }
}