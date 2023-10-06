import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as path from 'path';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';

@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // // Obtenez le chemin d'accès relatif du fichier. Si votre base de données et votre serveur de fichiers sont sur la même machine, vous pouvez simplement stocker le chemin d'accès relatif.
    // const relativePath = path.join('uploads', file.filename);

    // // Utilisez votre service pour sauvegarder le chemin d'accès en base de données.
    // const savedPicture = this.pictureService.createPic(relativePath);
    // return savedPicture;
  }

  @Post()
  create(@Body() createPictureDto: CreatePictureDto) {
    return this.pictureService.createPic(createPictureDto);
  }

  @Get()
  findAll() {
    return this.pictureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pictureService.findOne(+id);
  }

  @Get('product/:productId')
  findByProduct(@Param('productId') productId: number) {
    return this.pictureService.findByProduct(productId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto) {
    return this.pictureService.updatePic(+id, updatePictureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pictureService.removePic(+id);
  }
}
