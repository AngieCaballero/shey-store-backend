import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

@Entity()
export class Users {
  @ApiProperty()
  @PrimaryGeneratedColumn({type: 'int'})
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
  @Column({  nullable: true })
  full_name?: string

  @ApiProperty()
  @Column({  nullable: true })
  gender: string

  @ApiProperty()
  @Column({  nullable: true })
  phone?: string

  @ApiProperty()
  @Column({  nullable: true })
  photo?: string

  @ApiProperty()
  @Column({type: 'enum', enum: Role, default: Role.BUYER})
  role?: Role

  @ApiProperty()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
