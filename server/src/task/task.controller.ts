import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { Task } from '../../prisma/generated/client';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { TaskDto } from './dto/task.dto';

@Controller('user/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Auth()
  public async getAllTasks(@CurrentUser('id') userId: string): Promise<Task[]> {
    return this.taskService.getAllTasks(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  public async create(
    @Body() dto: TaskDto,
    @CurrentUser('id') userId: string,
  ): Promise<Task> {
    return this.taskService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  public async update(
    @Body() dto: TaskDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.taskService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  public async delete(@Param('id') id: string): Promise<Task> {
    return this.taskService.delete(id);
  }
}
