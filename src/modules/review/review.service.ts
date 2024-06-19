import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { ProductService } from '../product/product.service';
import { UsersService } from '../users/users.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService
  ) {
  }

  async create(user_id: number, product_id: number, createReviewDto: CreateReviewDto) {
    const user = await this.usersService.findUserById(user_id);
    const product = await this.productService.findById(product_id)

    const review = this.reviewRepository.create(createReviewDto)
    review.user = user;

    const sumTotalReviews = product.review.reduce((n, {rating}) => n + rating, 0) + review.rating;
    product.rate = (sumTotalReviews / (product.review.length)).toFixed(1).toString()

    review.product = await this.productService.saveProduct(product);

    const reviewSaved = await this.reviewRepository.save(review);
    return this.findById(reviewSaved.id)
  }

  async findById(id: number) {
    const review = await this.reviewRepository.findOne({
      where: {
        id
      }
    })

    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }

    return review
  }

  async findReviewByProduct(product_id: number) {
    return await this.reviewRepository.find({
      where: {
        product: {
          id: product_id
        }
      },
      select: {
        user: {
          username: true,
          photo: true
        }
      },
      relations: {
        user: true
      }
    })
  }
}