import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
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
  @Put(':user_id')
  async update(@Body() createCartItemDto: CreateCartItemDto, @Param('user_id') user_id: number) {
    return this.cartService.update(createCartItemDto, user_id)
  }
}