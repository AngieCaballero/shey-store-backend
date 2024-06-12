import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ShippingAddress {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @Column()
  details: string

  @ApiProperty()
  @Column()
  default: boolean

  @ApiProperty()
  @ManyToOne(() => Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}