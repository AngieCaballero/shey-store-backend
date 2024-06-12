import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingAddress } from './entities/shipping-address.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';

@Injectable()
export class ShippingAddressService {
  constructor(
    @InjectRepository(ShippingAddress) private readonly shippingAddressRepository: Repository<ShippingAddress>,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
  ) {
  }

  async create(user_id: number, shippingAddressDto: CreateShippingAddressDto) {
    const user = await this.usersService.findUserById(user_id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const shippingAddress = this.shippingAddressRepository.create(shippingAddressDto);
    shippingAddress.user = user;

    if (shippingAddress.default) {
      await this.findDefaultShippingAddress(user.id);
    }
    return await this.shippingAddressRepository.save(shippingAddress);
  }

  async update(user_id: number, shipping_id: number, shippingAddressDto: CreateShippingAddressDto) {
    const user = await this.usersService.findUserById(user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (shippingAddressDto.default) {
      await this.findDefaultShippingAddress(user.id);
    }

    const shippingAddress = await this.findById(shipping_id)

    const shippingAddressUpdated = this.shippingAddressRepository.merge(shippingAddress, shippingAddressDto);

    return await this.shippingAddressRepository.save(shippingAddressUpdated)
  }

  async remove(user_id: number, shipping_address_id: number) {
    const user = await this.usersService.findUserById(user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const shippingAddress = await this.findById(shipping_address_id)

    return await this.shippingAddressRepository.remove(shippingAddress)
  }

  async findByUser(user_id: number) {
    const user = await this.usersService.findUserById(user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await this.shippingAddressRepository.find({
      where: {
        user: {
          id: user_id,
        }
      }
    })
  }

  async findById(id: number) : Promise<ShippingAddress> {
    const shippingAddressExists = await this.shippingAddressRepository.findOne({
      where: { id },
      relations: {
        user: true
      }
    })

    if (!shippingAddressExists) {
      throw new HttpException('Shipping Address not found', HttpStatus.NOT_FOUND);
    }

    return shippingAddressExists
  }

  async findDefaultShippingAddress(user_id: number) {
    const defaultShippingAddress = await this.shippingAddressRepository.findOne({
      where: {
        default: true,
        user: {
          id: user_id,
        },
      },
    });

    if (defaultShippingAddress) {
      defaultShippingAddress.default = false;
      await this.shippingAddressRepository.save(defaultShippingAddress);
    }
  }
}