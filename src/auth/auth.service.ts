import {HttpException, Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {InjectRepository} from '@nestjs/typeorm'
import {compare, hash} from 'bcrypt'
import {Repository} from 'typeorm'
import {Users} from '../users/entities/users.entity'
import {UsersService} from '../users/users.service'
import {LoginDto} from './dto/login.dto'
import {RegisterDto} from './dto/register.dto'
import {TokenDto} from './dto/token.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const user = await this.userRepo.findOne({
      where: { email: loginDto.email },
    })

    if (!user) throw new HttpException('El correo suministrado no existe', 401);

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) throw new HttpException('Credenciales inválidas', 401);

    const payload = {
      id: user.id,
      email: user.email,
    }

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    })
    delete user.password

    return { ...user, token }
  }

  async register(user: RegisterDto): Promise<RegisterDto> {
    if (!(await this.isEmailValid(user.email))) {
      throw new HttpException('Formato de correo invalido', 400)
    }

    const mailExists = await this.userRepo.findOne({
      where: { email: user.email },
    })

    if(mailExists) {
      throw new HttpException('Este correo ya está siendo utilizado por otro usuario', 400);
    }

    if (!(await this.isPasswordValid(user.password))) {
      throw new HttpException(
        "La contraseña debe contener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula y 1 número.",
        400,
      );
    }

    user.password = await hash(user.password, 10);

    return await this.usersService.create(user);
  }


  async isEmailValid(email: string): Promise<boolean> {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  async isPasswordValid(password: string): Promise<boolean> {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }
}
