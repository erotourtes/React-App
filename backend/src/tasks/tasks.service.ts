import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.input';
import { Task } from './tasks.entity';
import { UpdateTaskDto } from './dto/update-task.input';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id },
    });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create({ ...dto });
    return await this.taskRepository.save(newTask);
  }

  async update(taskId: number, task: UpdateTaskDto): Promise<Task> {
    const foundTask = await this.taskRepository.findOne({
      where: { id: taskId },
    });
    if (!foundTask)
      throw new NotFoundException(`Task with id ${taskId} not found`);

    return this.taskRepository.save({
      ...foundTask,
      ...task,
    });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
