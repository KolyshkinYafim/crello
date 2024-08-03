import { PrismaService } from '../ prisma.service';
import { Task } from '../../prisma/generated/client';
import { TaskDto } from './dto/task.dto';

export class TaskService {
  constructor(private prisma: PrismaService) {}

  public async getAllTasks(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  public async create(dto: TaskDto, userId: string) {
    return this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async update(
    dto: Partial<TaskDto>,
    taskId: string,
    userId: string,
  ): Promise<Task> {
    return this.prisma.task.update({
      where: {
        userId,
        id: taskId,
      },
      data: dto,
    });
  }

  public async delete(taskId: string): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
