import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipping } from './entities/shipping.entity';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>,
  ) {}

  async create(createShippingDto: CreateShippingDto): Promise<Shipping> {
    const shipping = await this.shippingRepository.save(createShippingDto);
    return shipping;
  }

  async findAll(): Promise<Shipping[]> {
    return await this.shippingRepository.find();
  }

  async findOne(id: number): Promise<Shipping> {
    return this.shippingRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateShippingDto: UpdateShippingDto): Promise<any> {
    return await this.shippingRepository.update(id, updateShippingDto);
  }

  async remove(id: number): Promise<any> {
    return await this.shippingRepository.delete(id);
  }
}
