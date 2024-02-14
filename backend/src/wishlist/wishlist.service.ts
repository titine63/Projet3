import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistDTO } from './dto/create-wishlist.dto';
import { Product } from './../product/entities/product.entity';
import { User } from './../users/entities/user.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async isProductInWishlist(wishlistDto: WishlistDTO): Promise<boolean> {
    const { userId, productId } = wishlistDto;
    const existingWishlistItem = await this.wishlistRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
    return !!existingWishlistItem;
  }

  async addToWishlist(wishlistDto: WishlistDTO): Promise<Wishlist> {
    const productAlreadyInWishlist = await this.isProductInWishlist(
      wishlistDto,
    );

    if (productAlreadyInWishlist) {
      throw new NotFoundException("Ce produit est déjà dans la liste d'envie");
    }

    // Ajouter le produit à la liste d'envie si ce n'est pas déjà le cas
    const wishlistItem = new Wishlist();
    wishlistItem.user = await this.userRepository.findOneBy({
      id: wishlistDto.userId,
    });
    wishlistItem.product = await this.productRepository.findOneBy({
      id: wishlistDto.productId,
    });
    return this.wishlistRepository.save(wishlistItem);
  }

  async getWishListByUserId(userId: number): Promise<Wishlist[]> {
    return await this.wishlistRepository.find({
      where: { userId: userId },
      relations: ['product'],
    });
  }

  async findAll(): Promise<Wishlist[]> {
    return await this.wishlistRepository.find();
  }

  async removeFromWishlist(userId: number, productId: number): Promise<void> {
    const wishlistItem = await this.wishlistRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
    if (!wishlistItem) {
      throw new NotFoundException(
        "Cet produit n'existe pas dans la liste d'envie",
      );
    }
    await this.wishlistRepository.remove(wishlistItem);
  }

  async clearWishlist(userId: number): Promise<void> {
    const wishlistItems = await this.wishlistRepository.find({
      where: { user: { id: userId } },
    });

    for (const wishlistItem of wishlistItems) {
      await this.wishlistRepository.remove(wishlistItem);
    }
  }
}
