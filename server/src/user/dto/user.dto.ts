import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class PomodoroSettingsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  workInterval?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  breakInterval?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  intervalCounts?: number;
}

export class UserDto extends PomodoroSettingsDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsString()
  password?: string;
}
