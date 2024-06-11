import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOkResponse({
    type: Cart
  })
  @Get(':user_id')
  async findByUserId(@Param('user_id') user_id: number) {
    return await this.cartService.findByUserId(user_id)
  }

  @ApiOkResponse({
    type: Cart
  })
  @Put(':user_id')
  async update(@Body() createCartItemDto: CreateCartItemDto, @Param('user_id') user_id: number) {
    return await this.cartService.update(createCartItemDto, user_id)
  }

  @ApiOkResponse({
    type: Cart
  })
  @Delete(':user_id')
  async delete(@Param('user_id') user_id: number) {
    return await this.cartService.deleteCart(user_id)
  }

  @ApiOkResponse({
    type: Cart
  })
  @Delete(':user_id/:product_id')
  async removeItemFromCart(@Param('user_id') user_id: number, @Param('product_id') product_id: number){
    return await this.cartService.removeItemFromCart(user_id, product_id)
  }
}