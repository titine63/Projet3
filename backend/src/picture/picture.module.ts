import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entities/picture.entity';
import { PictureService } from './picture.service';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Picture]),
    MulterModule.register({
      dest: path.join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [PictureController],
  providers: [PictureService],
  exports: [PictureService, TypeOrmModule.forFeature([Picture])],
})
export class PictureModule {}
