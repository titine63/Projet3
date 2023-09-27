import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Category } from '../entities/product.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {
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
  @IsEnum(Category)
  category: Category;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  state: string;

  // @IsNotEmpty()
  // user: number;
}
