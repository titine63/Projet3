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
import { diskStorage } from 'multer';
import * as path from 'path';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';

@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename =
            path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
          const extension = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    console.log(file);
    // Obtenez le chemin d'accès relatif du fichier. Si votre base de données et votre serveur de fichiers sont sur la même machine, vous pouvez simplement stocker le chemin d'accès relatif.
    const relativePath = path.join('/uploads', file.filename);

    // Utilisez votre service pour sauvegarder le chemin d'accès en base de données.
    const savedPicture = this.pictureService.createPic({
      url: relativePath,
      productId: parseInt(id),
      fileName: file.filename,
    } as CreatePictureDto);
    return savedPicture;
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
