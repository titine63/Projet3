import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsEnum(['pending', 'paid', 'shipped', 'delivered'])
  status: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsEnum(['paypal', 'stripe'])
  paymentMethod: string;
}