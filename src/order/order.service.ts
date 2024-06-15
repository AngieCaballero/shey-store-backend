import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CartService } from '../cart/cart.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './enums/order-status.enum';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    @Inject(forwardRef(() => CartService)) private readonly cartService: CartService
  ) {
  }

  async create(user_id: number, createOrderDto: CreateOrderDto) {
    const user = await this.usersService.findUserById(user_id)

    const order = this.orderRepository.create()

    order.cart = await this.cartService.changeStatusCart(OrderStatus.COMPLETED, user_id)

    order.status = createOrderDto.orderStatus
    order.user = user

    return await this.orderRepository.save(order)
  }

  async update(user_id: number, order_id: number, updateOrderDto: UpdateOrderDto) {
    const user = await this.usersService.findUserById(user_id)
    const order = await this.findByOrderId(user_id, order_id)

    order.status = updateOrderDto.orderStatus
    return await this.orderRepository.save(order)
  }

  async remove(user_id: number, order_id: number) {
    const user = await this.usersService.findUserById(user_id)
    const order = await this.findByOrderId(user_id, order_id)
    return await this.orderRepository.remove(order)
  }

  async findByUserId(user_id: number, status: OrderStatus) {
    const user = await this.usersService.findUserById(user_id)

    const order = await this.orderRepository.find({
      where: {
        user: {
          id: user_id,
        },
        status: status
      },
      relations: {
        user: true,
        cart: {
          cartItems: {
            product: true
          }
        }
      }
    })

    if (!order) {
      throw new NotFoundException('User does not have any order');
    }

    return order
  }

  async findByOrderId(user_id: number, order_id: number) {
    const user = await this.usersService.findUserById(user_id)

    const order = await this.orderRepository.findOne({
      where: {
        user: {
          id: user_id,
        },
        id: order_id
      },
      relations: {
        user: true,
        cart: {
          cartItems: {
            product: true
          }
        }
      }
    })

    if (!order) {
      throw new NotFoundException('User does not have any order');
    }

    return order
  }
}