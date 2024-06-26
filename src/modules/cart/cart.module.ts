import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UsersModule } from '../users/users.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartItem } from './entities/cart-item.entity';
import { ProductModule } from '../product/product.module';
import { Report } from '../report/entities/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Report]), UsersModule, ProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}