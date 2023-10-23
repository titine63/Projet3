import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { PictureModule } from './../picture/picture.module';
import { OrderService } from './../order/order.service';
import { UsersService } from './../users/users.service';
import { OrderModule } from './../order/order.module';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    PictureModule,
    OrderModule,
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, OrderService, UsersService],
  exports: [ProductService, TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
