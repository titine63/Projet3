import { Controller, Post, Delete, Param, Get, Body } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistDTO } from './dto/create-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('/add')
  addToWishlist(@Body() wishlistDto: WishlistDTO) {
    return this.wishlistService.addToWishlist(wishlistDto);
  }

  @Get()
  getAllWishlists() {
    return this.wishlistService.findAll();
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: number) {
    return this.wishlistService.getWishListByUserId(userId);
  }

  @Delete(':userId/remove/:productId')
  removeFromWishlist(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    return this.wishlistService.removeFromWishlist(userId, productId);
  }

  @Delete(':userId/clear')
  async clearWishlist(@Param('userId') userId: number): Promise<void> {
    await this.wishlistService.clearWishlist(userId);
  }
}
