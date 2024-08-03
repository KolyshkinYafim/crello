import { TimeBlockService } from './time-block.service';
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
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { TimeBlockDto } from './dto/time-block.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('user/time-block')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @Get()
  @Auth()
  public async getAll(@CurrentUser('id') id: string) {
    return this.timeBlockService.getAll(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  public async create(
    @Body() dto: TimeBlockDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.timeBlockService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('id')
  @Auth()
  public async update(
    @Body() dto: TimeBlockDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.timeBlockService.update(dto, id, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-order')
  @Auth()
  public async updateOrder(@Body() dto: UpdateOrderDto) {
    return this.timeBlockService.updateOrder(dto.ids);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  public async delete(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.timeBlockService.delete(id, userId);
  }
}
