import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from './cart-item.entity';
import { Users } from '../../users/entities/users.entity';
import { OrderStatus } from '../../order/enums/order-status.enum';

@Entity()
export class Cart {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({type: 'enum', enum: OrderStatus, default: OrderStatus.IN_PROGRESS})
  status: OrderStatus;

  @ApiProperty()
  @OneToMany(() => CartItem, (cart_items) => cart_items.cart,{ cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'cart_item_id' })
  cartItems?: CartItem[];

  @ManyToOne(() => Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}