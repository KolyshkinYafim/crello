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
import PomodoroService from './pomodoro.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { PomodoroRoundDto, PomodoroSessionDto } from './dto/pomodoro.dto';

@Controller('user/pomodoros')
export default class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Get('today')
  @Auth()
  public async getTodaySession(@CurrentUser('id') id: string) {
    return this.pomodoroService.getTodaySession(id);
  }

  @HttpCode(200)
  @Post()
  @Auth()
  public async create(@CurrentUser('id') userId: string) {
    return this.pomodoroService.create(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/round/id')
  @Auth()
  public async updateRound(
    @Param('id') id: string,
    @Body() dto: PomodoroRoundDto,
  ) {
    return this.pomodoroService.updateRound(dto, id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  public async update(
    @Body() dto: PomodoroSessionDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.pomodoroService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  public async delete(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.pomodoroService.deleteSession(id, userId);
  }
}
