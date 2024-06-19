import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly auth_strategy: string
}
