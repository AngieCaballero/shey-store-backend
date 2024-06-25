import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule, UsersModule],
  exports: [ProductService],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}