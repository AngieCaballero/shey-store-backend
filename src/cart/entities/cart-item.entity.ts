import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string

  @Column()
  quantity: number;

  @Column()
  total_price: number;

  @Column()
  price_by_unit: number;

  @Column()
  product_id: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @ManyToOne(() => Cart, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart
}