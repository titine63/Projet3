import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsEnum(['paypal', 'stripe'])
  paymentMethod: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  shippingId: number;
}
