import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  size: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  clothing_type: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  brand: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  color: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  category: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  state: string;

  //   @IsInt()
  //   @IsNotEmpty()
  //   user: number;
}
