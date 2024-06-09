import { Injectable } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RegisterDto } from '../auth/dto/register.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Users } from './entities/users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  ) {}

  async create(createUserDto: RegisterDto): Promise<RegisterDto> {
    const userExists = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    })

    if (userExists) {
      throw new HttpException('User already exists', 400)
    }
    const user = this.userRepo.create(createUserDto)

    return await this.userRepo.save(user)
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepo.find()
  }

  async findUserById(id: number): Promise<Users> {
    const user = await this.userRepo.findOne({
      where: { id: id },
    })

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    return user
  }

  async findUserByEmail(email: string): Promise<Users> {
    const user = await this.userRepo.findOne({ where: { email } })

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const userExists = await this.findUserById(id)

    if (!userExists) {
      throw new HttpException('User not found', 404)
    }

    const user = this.userRepo.merge(userExists, updateUserDto)

    return await this.userRepo.save(user)
  }

  async remove(id: number): Promise<Users> {
    const userExists = await this.findUserById(id)

    if (!userExists) {
      throw new HttpException('User not found', 404)
    }

    return await this.userRepo.remove(userExists)
  }
}
