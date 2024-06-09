import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: TokenDto
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // check if body is empty
    if (Object.keys(loginDto).length === 0)
      throw new HttpException(
        'Please provide an username, email and a password',
        400,
      )

    return await this.authService.login(loginDto)
  }

  @ApiOkResponse({
    type: TokenDto
  })
  @Post('register')
  async register(@Body() user: LoginDto) {
    // check if body is empty
    if (Object.keys(user).length === 0)
      throw new HttpException(
        'Please provide an username, email and a password',
        400,
      )

    // check if the password is valid length
    if (user.password.length < 8)
      throw new HttpException('Password must be at least 8 characters', 400)

    return await this.authService.register(user)
  }
}
