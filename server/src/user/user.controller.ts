import {
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  public async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  public async updateProfile(
    @CurrentUser('id') id: string,
    @Body() dto: UserDto,
  ) {
    return this.userService.update(id, dto);
  }
}
