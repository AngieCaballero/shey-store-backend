import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './enums/order-status.enum';

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

  @Get('user/:user_id/status/:status_id')
  async findByUserId(@Param('user_id') user_id: number, @Param('status_id') status_id: number) {
    let orderStatus: OrderStatus
    if (status_id == 1) {
      orderStatus = OrderStatus.IN_PROGRESS
    } else {
      orderStatus = OrderStatus.COMPLETED
    }
    return await this.orderService.findByUserId(user_id, orderStatus);
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