/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product, Category } from './entities/product.entity';
import { Order } from './../order/entities/order.entity';
import { User } from 'src/users/user.entity/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private usersService: Repository<User>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getProductsByUserId(userId: number): Promise<Product[]> {
    return await this.productRepository.find({ where: { userId: userId } });
  }

  async getProductsByOrderUserId(userId: number): Promise<Product[]> {
    // D'abord, récupérez les IDs de commande pour le userId donné
    const orders = await this.orderRepository.find({
      where: { userId: userId },
    });
    console.log('orders :>> ', orders);
    // Ensuite, récupérez les IDs de commande pour le userId donné
    const orderIds = orders.map((order) => order.id);

    // Ensuite, récupérez les produits associés à ces IDs de commande
    const products = await this.productRepository.find({
      where: { orderId: In(orderIds) },
    });

    return products;
  }

  async filterProductWithQuery(filter: any): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (filter.clothing_type) {
      queryBuilder.andWhere('product.clothing_type = :clothing_type', {
        clothing_type: filter.clothing_type,
      });
    }

    if (filter.color) {
      queryBuilder.andWhere('product.color = :color', { color: filter.color });
    }
    if (filter.title) {
      queryBuilder.andWhere('product.title = :title', { title: filter.title });
    }

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

    if (filter.category) {
      queryBuilder.andWhere('product.category = :category', {
        category: filter.category,
      });
    }

    if (filter.brand) {
      queryBuilder.andWhere('product.brand = :brand', { brand: filter.brand });
    }

    if (filter.size) {
      queryBuilder.andWhere('product.size = :size', { size: filter.size });
    }

    if (filter.state) {
      queryBuilder.andWhere('product.state = :state', { state: filter.state });
    }
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

  async findOneProduct(id: number): Promise<any> {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (product && product.userId) {
      // Supposons que votre entité Product a une propriété userId
      const user = await this.usersService.findOne({
        where: { id: product.userId },
      });
      const productWithUser = {
        ...product,
        userPseudo: user?.pseudo,
        userPicture: user?.picture,
      };
      return productWithUser;
    }

    return product;

  async searchProductsByTitle(title: string): Promise<Product[]> {
    const filter = { title };
    return await this.filterProductWithQuery(filter);
  }

  async findOneProduct(id: number): Promise<Product> {
    return await this.productRepository.findOne({ where: { id: id } });
  }

  async findProductsByCategory(category: Category): Promise<Product[]> {
    return await this.productRepository.find({ where: { category } });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }
}
