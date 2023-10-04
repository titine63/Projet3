import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePictureDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  url: string;

  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  @IsString()
  fileName: string;
}
