import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), ProductModule, UsersModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService]
})
export class ReviewModule {}