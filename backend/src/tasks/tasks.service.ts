import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto, UpdateTaskDto } from '@shared/dtos';
import { TaskListsService } from 'src/task-lists/task-lists.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private listService: TaskListsService,
  ) {}

  async findAll(id?: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { list: { id } },
    });
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const list = await this.listService.findOne(dto.listId);
    if (!list)
      throw new NotFoundException(`List with id ${dto.listId} not found`);

    const newTask = this.taskRepository.create({ ...dto, list: list });
    return await this.taskRepository.save(newTask).catch((e) => {
      this.logger.error(e);
      throw new BadRequestException('Task creation failed');
    });
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
