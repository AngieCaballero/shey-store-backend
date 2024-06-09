import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { SpecialsOffers } from './entities/specials-offers.entity';
import { CreateSpecialOfferDto } from './dto/create-special-offer.dto';
import { SpecialOffersService } from './specials-offers.service';

@ApiTags('Special Offers')
@Controller('specials-offers')
export class SpecialOffersController {
  constructor(private readonly specialsOffersService: SpecialOffersService) {}

  @ApiOkResponse({
    type: SpecialsOffers,
  })
  @Post()
  async create(@Body() createSpecialOfferDto: CreateSpecialOfferDto) {
    if (Object.keys(createSpecialOfferDto).length === 0) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }

    return await this.specialsOffersService.create(createSpecialOfferDto)
  }

  @ApiOkResponse({
    type: SpecialsOffers
  })
  @Put(':special_offer_id')
  async update(@Body() createSpecialOfferDto: CreateSpecialOfferDto, @Param('special_offer_id') id: string) {
    if (Object.keys(createSpecialOfferDto).length === 0) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }

    return await this.specialsOffersService.update(+id, createSpecialOfferDto)
  }

  @ApiOkResponse({
    type: SpecialsOffers
  })
  @Get(':special_offer_id')
  async findById(@Param('special_offer_id') id: string) {
    return await this.specialsOffersService.findById(+id)
  }

  @ApiOkResponse({
    type: SpecialsOffers,
    isArray: true
  })
  @Get()
  async findAll() {
    return await this.specialsOffersService.findAll()
  }

  @ApiOkResponse({
    type: SpecialsOffers
  })
  @Delete(':special_offer_id')
  async delete(@Param('special_offer_id') id: string) {
    return await this.specialsOffersService.remove(+id)
  }
}