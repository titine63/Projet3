import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  // IsInt,
} from 'class-validator';
import { Category } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Le titre est obligatoire' })
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'La description est obligatoire' })
  description: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2,
  })
  @IsNotEmpty({ message: 'Le prix est obligatoire' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'La taille est obligatoire' })
  @MaxLength(10)
  size: string;

  @IsString()
  @IsNotEmpty({ message: 'Le type de vêtement est obligatoire' })
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
  @IsNotEmpty({
    message: 'La catégorie est obligatoire parmi Homme, Femme, Enfant',
  })
  @MaxLength(10)
  @IsEnum(Category)
  category: Category;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  state: string;

  // @IsInt()
  // @IsNotEmpty()
  // userId: number;
}
