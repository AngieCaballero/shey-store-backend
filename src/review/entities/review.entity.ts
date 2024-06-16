import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entities/product.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Review {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({type: 'float'})
  rating: number

  @ApiProperty()
  @Column({type: 'text'})
  comment: string

  @ApiProperty()
  @Column({type: 'text'})
  image: string

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ApiProperty()
  @ManyToOne(() => Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}