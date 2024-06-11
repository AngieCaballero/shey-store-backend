import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string

  @ApiProperty()
  @IsNumber()
  quantity: number

  @ApiProperty()
  @IsNumber()
  total_price: number
}