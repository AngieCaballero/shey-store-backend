import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../category/entities/category.entity';
import { Review } from '../../review/entities/review.entity';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  discount: number

  @ApiProperty()
  @Column()
  image: string

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @Column({ type: 'float'})
  price: number

  @ApiProperty()
  @Column()
  rate: string

  @ApiProperty()
  @Column( 'text', {array: true, nullable: true})
  presentation_images?: string[]

  @ApiProperty()
  @Column( 'text', {array: true, nullable: true})
  colors?: string[]

  @ApiProperty()
  @Column({type: 'text', nullable: true})
  description?: string

  @ApiProperty()
  @OneToOne(() => Category, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ApiProperty()
  @OneToMany(() => Review, (review) => review.product, {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'review_id' })
  review?: Review[];
}