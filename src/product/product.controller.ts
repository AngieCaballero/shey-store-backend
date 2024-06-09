import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({
    type: Product
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    if (Object.keys(createProductDto).length === 0){
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
    }

    return await this.productService.create(createProductDto)
  }

  @ApiOkResponse({
    type: Product
  })
  @Put('product_id')
  async update(@Body() createProductDto: CreateProductDto, @Param('product_id') product_id: string) {
    if (Object.keys(createProductDto).length === 0){
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
    }
    return await this.productService.update(createProductDto, +product_id)
  }

  @Get(':product_id')
  async findById(@Param('product_id') product_id: string) {
    return await this.productService.findById(+product_id)
  }

  @ApiOkResponse({
    type: Product,
    isArray: true
  })
  @Get()
  async findAll() {
    return await this.productService.findAll()
  }

  @ApiOkResponse({
    type: Product
  })
  @Delete(':product_id')
  async remove(@Param('product_id') product_id: string) {
    return await this.productService.remove(+product_id)
  }
}