import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EntityManager, Reference } from '@mikro-orm/core';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(private readonly em: EntityManager) {}

  async create(userId: bigint, createTaskDto: CreateTaskDto): Promise<Task> {
    if (!createTaskDto.description) {
      throw new UnprocessableEntityException('Description is required');
    }

    const task = this.em.create(Task, {
      description: createTaskDto.description,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
      user: Reference.createFromPK(User, userId),
    });
    await this.em.persistAndFlush(task);
    return task;
  }

  async findAll(userId: number): Promise<Task[]> {
    return this.em.find(Task, { user: { id: userId } });
  }

  async findOne(userId: number, id: number): Promise<Task> {
    const task = await this.em.findOne(Task, { id, user: { id: userId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(
    userId: number,
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOne(userId, id);
    this.em.assign(task, updateTaskDto);
    await this.em.flush();
    return task;
  }

  async remove(userId: number, id: number): Promise<void> {
    const task = await this.findOne(userId, id);
    await this.em.removeAndFlush(task);
  }
}
