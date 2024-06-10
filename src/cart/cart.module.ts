import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UsersModule } from '../users/users.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartItem } from './entities/cart-item.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem]), UsersModule, ProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}