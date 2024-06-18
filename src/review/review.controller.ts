import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOkResponse({
    type: Review
  })
  @Post('user/:user_id/product/:product_id')
  async create(@Param('user_id') user_id: number, @Param('product_id') product_id: number, @Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(user_id, product_id, createReviewDto)
  }

  @Get('product/:product_id')
  async findReviewByProductId(@Param('product_id') product_id: number) {
    return await this.reviewService.findReviewByProduct(product_id)
  }
}