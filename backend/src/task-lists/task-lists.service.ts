import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskList } from './task-lists.entity';
import { CreateTaskListDto } from './dto/create-task.input';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskListsService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListsRepository: Repository<TaskList>,
  ) {}

  async findAll(): Promise<TaskList[]> {
    return this.taskListsRepository.find();
  }

  async create(dto: CreateTaskListDto): Promise<TaskList> {
    const newTaskList = this.taskListsRepository.create({ ...dto });
    return await this.taskListsRepository.save(newTaskList);
  }

  async delete(id: number) {
    await this.taskListsRepository.delete(id);
  }
}
