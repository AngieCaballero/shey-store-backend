import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod) private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService
  ) {
  }

  async create(user_id: number, createPaymentMethodDto: CreatePaymentMethodDto) {
    const user = await this.usersService.findUserById(user_id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const paymentMethod = this.paymentMethodRepository.create(createPaymentMethodDto);
    paymentMethod.user = user
    return this.paymentMethodRepository.save(paymentMethod);
  }

  async update(user_id: number, payment_method_id: number, createPaymentMethodDto: CreatePaymentMethodDto) {
    const user = await this.usersService.findUserById(user_id);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const paymentMethod = await this.findById(payment_method_id)

    const paymentMethodUpdated = this.paymentMethodRepository.merge(paymentMethod, createPaymentMethodDto)
    return this.paymentMethodRepository.save(paymentMethodUpdated)
  }

  async findByUserId(user_id: number) {
    return await this.paymentMethodRepository.find({
      where: {
        user: {
          id: user_id,
        }
      }
    })
  }

  async remove(payment_method_id: number, user_id: number) {
    const user = await this.usersService.findUserById(user_id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const paymentMethod = await this.findById(payment_method_id)
    if (!paymentMethod) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    return this.paymentMethodRepository.remove(paymentMethod)
  }

  async findById(id: number) {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: {
        id
      },
      relations: {
        user: true
      }
    })

    if (!paymentMethod) {
      throw new HttpException('Payment method not found', HttpStatus.NOT_FOUND);
    }

    return paymentMethod
  }
}