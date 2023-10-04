import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Picture } from './../picture/entities/picture.entity';
import { PictureService } from './../picture/picture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Picture])],
  controllers: [ProductController],
  providers: [ProductService, PictureService],
  exports: [ProductService, TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
