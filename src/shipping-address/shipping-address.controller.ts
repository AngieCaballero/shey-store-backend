import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { ShippingAddress } from './entities/shipping-address.entity';

@ApiTags('Shipping Address')
@Controller('shipping-address')
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {
  }

  @ApiOkResponse({
    type: ShippingAddress,
  })
  @Post(':user_id')
  async create(@Body() createShippingAddressDto: CreateShippingAddressDto, @Param('user_id') user_id: number) {
    return await this.shippingAddressService.create(user_id, createShippingAddressDto);
  }

  @ApiOkResponse({
    type: ShippingAddress,
  })
  @Put(':user_id/:shipping_address_id')
  async update(
    @Param('user_id') user_id: number,
    @Param('shipping_address_id') shipping_address_id: number,
    @Body() createShippingAddressDto: CreateShippingAddressDto
  ) {
    return await this.shippingAddressService.update(user_id, shipping_address_id, createShippingAddressDto);
  }

  @ApiOkResponse({
    type: ShippingAddress,
    isArray: true
  })
  @Get('user/:user_id')
  async findByUser(@Param('user_id') user_id: number) {
    return await this.shippingAddressService.findByUser(user_id);
  }

  @Get(':shipping_address_id')
  async findByShippingAddress(@Param('shipping_address_id') shipping_address_id: number) {
    return await this.shippingAddressService.findById(shipping_address_id)
  }

  @ApiOkResponse({
    type: ShippingAddress,
  })
  @Delete(':user_id/:shipping_address_id')
  async delete(@Param('user_id') user_id: number, @Param('shipping_address_id') shipping_address_id: number) {
    return await this.shippingAddressService.remove(user_id, shipping_address_id);
  }
}