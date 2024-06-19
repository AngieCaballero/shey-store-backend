import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialsOffers } from './entities/specials-offers.entity';
import { Repository } from 'typeorm';
import { CreateSpecialOfferDto } from './dto/create-special-offer.dto';

@Injectable()
export class SpecialOffersService {
  constructor(
    @InjectRepository(SpecialsOffers) private readonly specialsOffersRepository: Repository<SpecialsOffers>
  ) { }

  async findAll() {
    return this.specialsOffersRepository.find()
  }

  async findById(id: number) {
    const specialsOffersExists = await this.specialsOffersRepository.findOne({
      where: { id }
    })

    if (!specialsOffersExists) {
      throw new HttpException('Special offers not found', 404)
    }

    return specialsOffersExists
  }

  async create(specialsOfferDto: CreateSpecialOfferDto) {
    return await this.specialsOffersRepository.save(specialsOfferDto) != null
  }

  async update(id: number, createSpecialOfferDto: CreateSpecialOfferDto) {
    const specialsOffersExists = await this.specialsOffersRepository.findOne({
      where: { id }
    })

    if (!specialsOffersExists) {
      throw new HttpException('Special offers not found', 404)
    }

    const specialOfferUpdated = this.specialsOffersRepository.merge(specialsOffersExists, createSpecialOfferDto)

    return await this.specialsOffersRepository.save(specialOfferUpdated)
  }

  async remove(id: number) {
    const specialsOffersExists = await this.specialsOffersRepository.findOne({
      where: { id }
    })

    if (!specialsOffersExists) {
      throw new HttpException('Special offers not found', 404)
    }

    return this.specialsOffersRepository.remove(specialsOffersExists)
  }
}