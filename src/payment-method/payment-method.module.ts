import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { UsersService } from '../users/users.service';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethodService } from './payment-method.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod]), UsersModule],
  controllers: [PaymentMethodController],
  exports: [PaymentMethodService],
  providers: [PaymentMethodService]
})
export class PaymentMethodModule {}