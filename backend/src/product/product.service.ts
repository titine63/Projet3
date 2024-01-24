/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product, Category } from './entities/product.entity';
import { validate } from 'class-validator';
import { OrderService } from './../order/order.service';
import { UsersService } from './../users/users.service';
import { PictureService } from './../picture/picture.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private orderService: OrderService,
    private usersService: UsersService,
    private pictureService: PictureService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const errors = await validate(createProductDto);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) =>
        Object.values(error.constraints).join(', '),
      );
      throw new BadRequestException(errorMessages.join('\n'));
    }
    return await this.productRepository.save(createProductDto);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['pictures'] });
  }

  async findOneProduct(id: number): Promise<any> {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (product?.userId) {
      const user = await this.usersService.getUserById(product.userId);
      const productWithUser = {
        ...product,
        userPseudo: user?.pseudo,
        userPicture: user?.picture,
      };
      return productWithUser;
    }

    return product;
  }

  async findProductsByCategory(category: Category): Promise<Product[]> {
    return await this.productRepository.find({ where: { category } });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    this.pictureService.removePic(id);
    return await this.productRepository.delete(id);
  }

  async getProductsByUserId(userId: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { userId: userId },
    });
  }

  async getProductsByOrderUserId(userId: number): Promise<Product[]> {
    // D'abord, récupérez les IDs de commande pour le userId donné
    const orders = await this.orderService.findAllOrdersByUserId(userId);
    // Ensuite, récupérez les IDs de commande pour le userId donné
    const orderIds = orders.map((order) => order.id);

    // Ensuite, récupérez les produits associés à ces IDs de commande
    const products = await this.productRepository.find({
      where: { orderId: In(orderIds) },
    });

    return products;
  }

  async filterProductWithQuery(filter: any): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.pictures', 'picture');

    const conditions = [
      'clothing_type',
      'color',
      'title',
      'category',
      'brand',
      'size',
      'state',
    ];

    conditions.forEach((condition) => {
      if (filter[condition]) {
        queryBuilder.andWhere(`product.${condition} LIKE :${condition}`, {
          [condition]: `%${filter[condition]}%`,
        });
      }
    });

    if (filter.minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: filter.minPrice,
      });
    }
    if (filter.maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: filter.maxPrice,
      });
    }

    return await queryBuilder.getMany();
  }

  async searchProductsBySearchTerm(searchTerm: string): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.pictures', 'picture');

    const conditions = [
      'clothing_type',
      'color',
      'title',
      'category',
      'brand',
      'size',
      'state',
    ];

    conditions.forEach((condition, index) => {
      if (index === 0) {
        queryBuilder.where(`product.${condition} LIKE :${condition}`, {
          [condition]: `%${searchTerm}%`,
        });
      } else {
        queryBuilder.orWhere(`product.${condition} LIKE :${condition}`, {
          [condition]: `%${searchTerm}%`,
        });
      }
    });

    return await queryBuilder.getMany();
  }
}