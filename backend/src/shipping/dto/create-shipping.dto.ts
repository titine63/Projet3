import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateShippingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  country: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsEnum(['point-relais', 'laposte'])
  shippingMethod: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
