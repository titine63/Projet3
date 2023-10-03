import { Category } from './entities/product.entity';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, MoreThan, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async filterProductWithQuery(filter: any): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product'); // méthode pour créer un constructeur de requête SQL pour l'entité Product

    if (filter.clothing_type) {
      //condition sera ajoutée en tant que condition supplémentaire à celles déjà présentes dans la requête.
      //le condition est : filtrer le resultat pour que le type de vêtement soit égale à celle qu'on a recu de la requête
      queryBuilder.andWhere('product.clothing_type = :clothing_type', {
        //  un objet de paramètres pour associer :clothing_type à la valeur de filter.clothing_type
        clothing_type: filter.clothing_type,
      });
    }

    if (filter.color) {
      queryBuilder.andWhere('product.color = :color', { color: filter.color });
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

  async findOneProduct(id: number): Promise<Product> {
    return await this.productRepository.findOneBy({ id: id });
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
