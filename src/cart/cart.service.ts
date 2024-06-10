import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItemRepository: Repository<CartItem>,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
  ) {
  }

  async create(user_id: number, cartItemDto: CreateCartItemDto) {
    const user = await this.usersService.findUserById(user_id);
    const product = await this.productService.findById(cartItemDto.product_id);
    const cartItem = this.cartItemRepository.create(cartItemDto);

    cartItem.product_id = product.id

    const cart = this.cartRepository.create({
      user_id: user.id,
      cartItems: [cartItem],
    });

    return this.cartRepository.save(cart);
  }

  async update(createCartItemDto: CreateCartItemDto, user_id: number) {
    const userHasCart = await this.checkIfUserHasCart(user_id);

    if (userHasCart && userHasCart.cartItems.length > 0) {
      const itemIndex = userHasCart.cartItems.findIndex((item) => {
        return item.product_id == createCartItemDto.product_id
      });

      if (itemIndex > -1) {
        let item = userHasCart.cartItems[itemIndex];
        userHasCart.cartItems[itemIndex] = this.cartItemRepository.merge(item, createCartItemDto);
        return await this.cartRepository.save(userHasCart);
      } else {
        const product = await this.productService.findById(createCartItemDto.product_id);
        const cartItem = this.cartItemRepository.create(createCartItemDto)
        cartItem.product_id = product.id
        userHasCart.cartItems.push(cartItem);
        return await this.cartRepository.save(userHasCart);
      }
    } else {
      return await this.create(user_id, createCartItemDto);
    }
  }

  async checkIfUserHasCart(user_id: number) {
    return await this.cartRepository.findOne({
      where: {
        user: {
          id: user_id,
        },
      },
      relations: {
        cartItems: true
      },
    });
  }
}