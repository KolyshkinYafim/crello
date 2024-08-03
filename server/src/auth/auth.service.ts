import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { Response } from 'express';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN: number = 1;
  REFRESH_TOKEN_NAME: string = 'refreshToken';
  constructor(
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  public async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto);
    const tokens: { accessToken: string; refreshToken: string } =
      this.issueToken(user.id);

    return { user, ...tokens };
  }

  public async register(dto: AuthDto) {
    const userIsExists = await this.userService.getByEmail(dto.email);

    if (userIsExists) throw new BadRequestException('User already exists');

    const { password, ...user } = await this.userService.create(dto);

    const tokens = this.issueToken(user.id);

    return { user, ...tokens };
  }

  private issueToken(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  public connectRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  public removeRefreshTokenToResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      //lax for using it in production mode
      sameSite: 'none',
    });
  }

  public async getNewTokens(refreshToken: string) {
    const res = await this.jwt.verifyAsync(refreshToken);
    if (!res) throw new UnauthorizedException('Invalid token');

    const { password, ...user } = await this.userService.getById(res.id);

    const tokens = this.issueToken(user.id);

    return { user, ...tokens };
  }
}
