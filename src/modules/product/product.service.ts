import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from '../review/dto/create-review.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @Inject(forwardRef(() => CategoryService)) private readonly categoryService: CategoryService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService
  ) {
  }

  async create(createProductDto: CreateProductDto, user_id: number) {
    const user = await this.usersService.findUserById(user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const category = await this.categoryService.findById(createProductDto.category_id)

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const product = this.productRepository.create(createProductDto)
    product.category = category
    product.users = user
    return await this.productRepository.save(product)
  }

  async update(createProductDto: CreateProductDto, id: number) : Promise<Product> {
    const category = await this.categoryService.findById(createProductDto.category_id)
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const productExists = await this.productRepository.findOne({
      where: {
        id: id
      }
    })
    if (!productExists) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    productExists.category = category

    const productUpdated = this.productRepository.merge(productExists, createProductDto)
    return await this.productRepository.save(productUpdated)
  }

  async saveProduct(product: Product) {
    return await this.productRepository.save(product)
  }

  async findById(id: number) : Promise<Product> {
    const productExists = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
        review: true
      }
    })

    if (!productExists) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return productExists
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        category: true
      }
    });
  }

  async remove(id: number) : Promise<Product> {
    const productExist = await this.productRepository.findOne({
      where: { id }
    })

    if (!productExist) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return await this.productRepository.remove(productExist)
  }
}