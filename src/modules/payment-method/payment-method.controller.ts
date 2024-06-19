import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { PaymentMethod } from './entities/payment-method.entity';

@ApiTags('Payment Methods')
@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) { }

  @ApiOkResponse({
    type: PaymentMethod
  })
  @Post('user/:user_id')
  async create(@Param('user_id') user_id: number, @Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return await this.paymentMethodService.create(user_id, createPaymentMethodDto)
  }

  @ApiOkResponse({
    type: PaymentMethod
  })
  @Put(':payment_method_id/user/:user_id')
  async update(@Param('pament_method_id')  payment_method_id: number, @Param('user_id') user_id: number, createPaymentMethodDto: CreatePaymentMethodDto) {
    return await this.paymentMethodService.update(user_id, payment_method_id, createPaymentMethodDto)
  }

  @ApiOkResponse({
    type: PaymentMethod,
    isArray: true
  })
  @Get('user/:user_id')
  async findByUserId(@Param('user_id') user_id: number) {
    return await this.paymentMethodService.findByUserId(user_id)
  }

  @ApiOkResponse({
    type: PaymentMethod
  })
  @Delete('payment_method_id/user/:user_id')
  async remove(@Param('user_id') user_id: number, @Param('payment_method_id') payment_method_id: number) {
    return await this.paymentMethodService.remove(payment_method_id, user_id)
  }
}