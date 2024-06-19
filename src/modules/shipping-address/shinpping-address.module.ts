import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingAddress } from './entities/shipping-address.entity';
import { UsersModule } from '../users/users.module';
import { ShippingAddressController } from './shipping-address.controller';
import { ShippingAddressService } from './shipping-address.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingAddress]), UsersModule],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService],
  exports: [ShippingAddressService]
})
export class ShippingAddressModule {}