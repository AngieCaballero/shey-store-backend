import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@ApiTags("Category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({
    type: Category
  })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    if (Object.keys(createCategoryDto).length === 0) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }

    return await this.categoryService.create(createCategoryDto)
  }

  @ApiOkResponse({
    type: Category
  })
  @Put(':category_id')
  async update(@Param('category_id') category_id: string, @Body() createCategoryDto: CreateCategoryDto) {
    if (Object.keys(createCategoryDto).length === 0) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }

    return await this.categoryService.update(+category_id, createCategoryDto)
  }

  @ApiOkResponse({
    type: Category,
    isArray: true
  })
  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @ApiOkResponse({
    type: Category
  })
  @Get(':category_id')
  async findById(@Param('category_id') category_id: string) {
    return await this.categoryService.findById(+category_id);
  }

  @ApiOkResponse({
    type: Category
  })
  @Delete(':category_id')
  async remove(@Param('category_id') category_id: string) {
    return await this.categoryService.remove(+category_id);
  }
}