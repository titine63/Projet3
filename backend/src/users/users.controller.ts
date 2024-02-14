// src/app/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Express } from 'express';
import * as path from 'path';
import { ParseIntPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Put('upload/:id')
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
    // Obtenez le chemin d'accès relatif du fichier. Si votre base de données et votre serveur de fichiers sont sur la même machine, vous pouvez simplement stocker le chemin d'accès relatif.
    const picture = path.join('/uploads', file.filename);

    // Utilisez votre service pour sauvegarder le chemin d'accès en base de données.
    const savedPicture = this.service.updatedUserPicture(parseInt(id), picture);
    return savedPicture;
  }

  @Get()
  getAll() {
    return this.service.getUsers();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post()
  create(@Body() user: User) {
    return this.service.saveUser(user);
  }

  @Put()
  update(@Body() user: User) {
    return this.service.saveUser(user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.service.deleteUser(id);
    return;
  }
}
