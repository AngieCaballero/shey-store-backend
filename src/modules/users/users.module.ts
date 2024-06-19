import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from '../auth/jwt/jwt.strategy'
import { Users } from './entities/users.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
