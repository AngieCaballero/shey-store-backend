import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInfoUserDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gender: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string

  @ApiProperty()
  @IsString()
  photo: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string
}