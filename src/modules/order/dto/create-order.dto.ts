import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';

export class CreateOrderDto {
  @ApiProperty()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @ApiProperty()
  @IsNumber()
  cart_id: number
}