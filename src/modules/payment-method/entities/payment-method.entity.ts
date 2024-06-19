import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class PaymentMethod {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  card_name: string

  @ApiProperty()
  @Column()
  card_number: string

  @ApiProperty()
  @Column()
  expired_at: string

  @ApiProperty()
  @Column()
  cvc_number: number

  @ApiProperty()
  @ManyToOne(() => Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}