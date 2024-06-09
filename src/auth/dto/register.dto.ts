import { IsNotEmpty, IsString } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends PartialType(LoginDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  auth_strategy?: string
}
