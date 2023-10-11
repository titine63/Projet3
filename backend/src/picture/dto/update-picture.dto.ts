import { PartialType } from '@nestjs/mapped-types';
import { CreatePictureDto } from './create-picture.dto';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdatePictureDto extends PartialType(CreatePictureDto) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  url: string;

  @IsInt()
  @IsNotEmpty()
  productId: number;
}
