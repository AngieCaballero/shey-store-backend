import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Report{
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  user_id: number;

  @ApiProperty()
  @Column()
  product_id: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column({ type: 'float', default: 0 })
  total_price: number;

  @ApiProperty()
  @CreateDateColumn()
  sold_at: Date;

  @ManyToOne(() => Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}