import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOkResponse({
    type: Order
  })
  @Post('user/:user_id')
  async create(@Param('user_id') user_id: number, @Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(user_id, createOrderDto);
  }

  @Get('user/:user_id')
  async findByUserId(@Param('user_id') user_id: number) {
    return await this.orderService.findByUserId(user_id);
  }

  @Put(':order_id/user/:user_id')
  async update(@Param('user_id') user_id: number, @Param('order_id') order_id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.update(user_id, order_id, updateOrderDto)
  }

  @Delete(':order_id/user/:user_id')
  async delete(@Param('user_id') user_id: number, @Param('order_id') order_id: number) {
    return await this.orderService.remove(user_id, order_id)
  }
}