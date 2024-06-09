import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SpecialsOffers {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  percent_discount: string

  @ApiProperty()
  @Column()
  description: string

  @ApiProperty()
  @Column()
  image: string

  @ApiProperty()
  @Column()
  title: string
}