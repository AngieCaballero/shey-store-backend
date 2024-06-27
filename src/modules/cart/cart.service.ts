import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ProductService } from '../product/product.service';
import { OrderStatus } from '../order/enums/order-status.enum';
import { compareSync } from 'bcrypt';
import { Report } from '../report/entities/report.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Report) private readonly reportRepository: Repository<Report>,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
  ) {
  }

  async create(user_id: number, cartItemDto: CreateCartItemDto) {
    const user = await this.usersService.findUserById(user_id);
    const product = await this.productService.findById(cartItemDto.product_id);

    product.quantity -= cartItemDto.quantity;

    if (product.quantity <= 0) {
      throw new HttpException('Product not available', HttpStatus.CONFLICT);
    }

    await this.productService.saveProduct(product)

    const cartItem = this.cartItemRepository.create(cartItemDto);

    cartItem.product_id = product.id
    cartItem.product = product

    const cart = this.cartRepository.create({
      user_id: user.id,
      cartItems: [cartItem],
      status: OrderStatus.IN_PROGRESS
    });

    return this.cartRepository.save(cart);
  }

  async update(createCartItemDto: CreateCartItemDto, user_id: number) {
    const userHasCart = await this.checkIfUserHasCart(user_id);

    if (userHasCart && userHasCart.cartItems.length > 0) {
      const itemIndex = userHasCart.cartItems.findIndex((item) => {
        return item.product_id == createCartItemDto.product_id
      });

      if (itemIndex > -1 && userHasCart.cartItems[itemIndex].color === createCartItemDto.color) {

        const product = await this.productService.findById(createCartItemDto.product_id)
        product.quantity -= createCartItemDto.quantity;

        if (product.quantity <= 0) {
          throw new HttpException('Product not available', HttpStatus.CONFLICT);
        }

        await this.productService.saveProduct(product)

        let item = userHasCart.cartItems[itemIndex];
        userHasCart.cartItems[itemIndex] = this.cartItemRepository.merge(item, createCartItemDto);
        return await this.cartRepository.save(userHasCart);

      } else {

        const product = await this.productService.findById(createCartItemDto.product_id);
        product.quantity -= createCartItemDto.quantity;
        if (product.quantity <= 0) {
          throw new HttpException('Product not available', HttpStatus.CONFLICT);
        }

        const productUpdated = await this.productService.saveProduct(product)

        const cartItem = this.cartItemRepository.create(createCartItemDto)
        cartItem.product_id = product.id
        cartItem.product = productUpdated
        userHasCart.cartItems.push(cartItem);
        return await this.cartRepository.save(userHasCart);
      }
    } else {
      if (userHasCart) await this.deleteCart(user_id)
      return await this.create(user_id, createCartItemDto);
    }
  }

  async changeStatusCart(new_status: OrderStatus, user_id: number) {
    const cart = await this.findByUserId(user_id)
    let totalPrice = 0;
    for (const item of cart.cartItems) {
      totalPrice += item.total_price;

      await this.reportRepository.save({
        user_id: item.product.users.id,
        product_id: item.product_id,
        quantity: item.quantity,
        category_id: item.product.category.id,
        total_price: totalPrice
      });
    }
    cart.status = new_status
    return await this.cartRepository.save(cart);
  }

  async findByUserId(user_id: number) {
    const userHasCart = await this.checkIfUserHasCart(user_id)

    if (!userHasCart) {
      throw new HttpException("Cart does not exist", HttpStatus.NOT_FOUND);
    }
    return userHasCart
  }

  async deleteCart(user_id: number) {
    const userHasCart = await this.checkIfUserHasCart(user_id);
    if (!userHasCart) {
      throw new HttpException("Cart does not exist", HttpStatus.NOT_FOUND);
    }

    for (const cartItem of userHasCart.cartItems) {
      const product = await this.productService.findById(cartItem.product_id)
      product.quantity += cartItem.quantity;
      await this.productService.saveProduct(product)
    }

    return this.cartRepository.remove(userHasCart)
  }

  async removeItemFromCart(user_id: number, item_cart_id: number) {
    const userHasCart = await this.checkIfUserHasCart(user_id);
    if (!userHasCart){
      throw new HttpException("Cart does not exist", HttpStatus.NOT_FOUND);
    }

    const itemCart = await this.cartItemRepository.findOneBy({
      id: item_cart_id
    })

    if (!itemCart) {
      throw new HttpException("Product not exists", HttpStatus.NOT_FOUND)
    }

    const product = await this.productService.findById(itemCart.product_id)

    product.quantity += itemCart.quantity

    await this.productService.saveProduct(product)

    return this.cartItemRepository.remove(itemCart)
  }

  async checkIfUserHasCart(user_id: number) {
    return await this.cartRepository.findOne({
      where: {
        user: {
          id: user_id,
        },
        status: OrderStatus.IN_PROGRESS
      },
      relations: {
        cartItems: {
          product: {
            users: true,
            category: true
          }
        }
      },
    });
  }
}