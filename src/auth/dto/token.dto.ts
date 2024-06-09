import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'
import { LoginDto } from './login.dto'
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto extends PartialType(LoginDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string
}
