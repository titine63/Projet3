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

  async create(createShippingDto: CreateShippingDto) {
    return await this.shippingRepository.save(createShippingDto);
  }

  async findAll() {
    return await this.shippingRepository.find();
  }

  async findOne(id: number) {
    return await this.shippingRepository.findOneBy({ id: id });
  }

  async update(id: number, updateShippingDto: UpdateShippingDto) {
    return await this.shippingRepository.update(id, updateShippingDto);
  }

  async remove(id: number) {
    return await this.shippingRepository.delete(id);
  }
}
