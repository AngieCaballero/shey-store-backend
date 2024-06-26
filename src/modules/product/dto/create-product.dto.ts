import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  discount: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNumber()
  price: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rate: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNumber()
  quantity: number

  @ApiProperty()
  @IsArray()
  presentation_images: string[]

  @ApiProperty()
  @IsArray()
  colors: string[]

  @ApiProperty()
  @IsNumber()
  category_id: number
}