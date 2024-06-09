import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {
  }

  async create(createCategoryDto: CreateCategoryDto) : Promise<Category> {
    return await this.categoryRepository.save(createCategoryDto)
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find()
  }

  async findById(id: number): Promise<Category> {
    const categoryExists = await this.categoryRepository.findOne({
      where: { id }
    })

    if (!categoryExists) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    return categoryExists
  }

  async update(id: number, createCategoryDto: CreateCategoryDto) : Promise<Category> {
    const categoryExists = await this.categoryRepository.findOne({
      where: { id }
    })

    if (!categoryExists) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    const categoryUpdated = this.categoryRepository.merge(categoryExists, createCategoryDto)
    return await this.categoryRepository.save(categoryUpdated)
  }

  async remove(id: number) : Promise<Category> {
    const categoryExists = await this.categoryRepository.findOne({
      where: { id }
    })

    if (!categoryExists) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    return this.categoryRepository.remove(categoryExists)
  }
}