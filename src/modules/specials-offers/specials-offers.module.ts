import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialsOffers } from './entities/specials-offers.entity';
import { SpecialOffersService } from './specials-offers.service';
import { SpecialOffersController } from './specials-offers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialsOffers])],
  exports: [SpecialOffersService],
  providers: [SpecialOffersService],
  controllers: [SpecialOffersController]
})
export class SpecialOffersModule {}