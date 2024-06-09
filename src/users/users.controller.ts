import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch
} from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/users.entity';
import { UpdateInfoUserDto } from './dto/update-info-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: Users,
    isArray: true
  })
  @Get()
  async findAll() {
    return this.usersService.findAll()
  }

  @ApiOkResponse({
    type: Users
  })
  @Get(':user_id')
  async findUserById(@Param('user_id') id: string) {
    return this.usersService.findUserById(+id)
  }

  @ApiOkResponse({
    type: Users
  })
  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email)
  }

  @ApiOkResponse({
    type: Users
  })
  @Patch(':user_id')
  async update(@Param('user_id') id: string, @Body() updateInfoUserDto: UpdateInfoUserDto) {
    if (Object.keys(updateInfoUserDto).length === 0)
      throw new HttpException('Body cannot be empty', 400)

    return this.usersService.update(+id, updateInfoUserDto)
  }

  @ApiOkResponse({
    type: Users
  })
  @Delete(':user_id')
  async remove(@Param('user_id') id: string) {
    return this.usersService.remove(+id)
  }
}
