import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { Wishlist } from './entities/wishlist.entity';
import { User } from './../users/entities/user.entity';
import { Product } from './../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, User, Product])],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
