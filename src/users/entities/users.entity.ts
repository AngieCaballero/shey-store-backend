import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  username?: string

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  email?: string

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  password?: string

  @ApiProperty()
  @Column({ length: 25, nullable: true })
  auth_strategy?: string

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
}
