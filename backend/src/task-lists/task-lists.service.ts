import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskList } from './task-lists.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskListDto, TaskListT, UpdateTaskListDto } from '@shared/dtos';

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

  async update(id: number, dto: UpdateTaskListDto): Promise<TaskListT> {
    const taskList = await this.findOneOrNull(id);
    if (!taskList)
      throw new NotFoundException(`Task list with id ${id} not found`);
    Object.assign(taskList, dto);
    return await this.taskListsRepository.save(taskList);
  }

  async delete(id: number) {
    if (!(await this.findOneOrNull(id)))
      throw new NotFoundException(`Task list with id ${id} not found`);
    await this.taskListsRepository.delete(id);
  }
}
