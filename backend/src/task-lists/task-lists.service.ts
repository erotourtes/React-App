import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskList } from './task-lists.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskListDto, TaskListT } from '@shared/dtos';

@Injectable()
export class TaskListsService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListsRepository: Repository<TaskList>,
  ) {}

  async findAll(): Promise<TaskListT[]> {
    return this.taskListsRepository.find();
  }

  async findOne(id: number): Promise<TaskListT> {
    return this.taskListsRepository.findOne({ where: { id } });
  }

  async findOneOrNull(id: number): Promise<TaskListT | null> {
    return await this.taskListsRepository
      .findOne({ where: { id } })
      .catch(() => null);
  }

  async create(dto: CreateTaskListDto): Promise<TaskListT> {
    const newTaskList = this.taskListsRepository.create({ ...dto });
    return await this.taskListsRepository.save(newTaskList);
  }

  async delete(id: number) {
    await this.taskListsRepository.delete(id);
  }
}
