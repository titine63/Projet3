import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
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
