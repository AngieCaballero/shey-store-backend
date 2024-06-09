import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from '../auth/dto/token.dto';
import { Users } from './entities/users.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: Users,
    isArray: true
  })
  @UseGuards(JwtAuthGuard)
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
  async update(@Param('user_id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (Object.keys(updateUserDto).length === 0)
      throw new HttpException('Body cannot be empty', 400)

    if (updateUserDto.password.length < 4)
      throw new HttpException('Password must be at least 4 characters', 400)

    return this.usersService.update(+id, updateUserDto)
  }

  @ApiOkResponse({
    type: Users
  })
  @Delete(':user_id')
  async remove(@Param('user_id') id: string) {
    return this.usersService.remove(+id)
  }
}
