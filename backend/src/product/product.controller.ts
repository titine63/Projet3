import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/product.entity';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('user/:userId')
  getProductsByUserId(@Param('userId') userId: number) {
    return this.productService.getProductsByUserId(userId);
  }

  @Get('order/user/:userId')
  getProductsByOrderUserId(@Param('userId') userId: number) {
    return this.productService.getProductsByOrderUserId(userId);
  }

  @Get('filter')
  //NestJS extrait automatiquement les paramètres de l'URL et les place dans un objet filter
  async filterProductWithQuery(@Query() filter: any) {
    console.log(
      'this.productService. :>> ',
      await this.productService.filterProductWithQuery(filter),
    );
    return await this.productService.filterProductWithQuery(filter);
  }

  @Get('search')
  async searchProductsByTitle(@Query('title') title: string) {
    if (title) {
      const products = await this.productService.searchProductsByTitle(title);
      return products;
    }
  }

  @Get(':id')
  findOneProduct(@Param('id') id: number) {
    return this.productService.findOneProduct(id);
  }

  @Get('category/:category')
  async findProductsByCategory(@Param('category') categoryParam: string) {
    console.log('categoryParam :>> ', categoryParam);

    const categoryMapping: Record<string, Category> = {
      homme: Category.MEN,
      femme: Category.WOMMEN,
      enfant: Category.KIDS,
    };

    if (!(categoryParam.toLowerCase() in categoryMapping)) {
      throw new BadRequestException('Catégorie non valide');
    }

    const category: Category = categoryMapping[categoryParam.toLowerCase()];
    console.log('category :>> ', category);
    return this.productService.findProductsByCategory(category);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
