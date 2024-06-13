import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  card_name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  card_number: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  expired_at: string

  @ApiProperty()
  @IsNumber()
  cvc_number: number
}