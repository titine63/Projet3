import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CreateShippingDto } from './../shipping/dto/create-shipping.dto';
import { ShippingService } from './../shipping/shipping.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private shippingService: ShippingService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.save(createOrderDto);
  }

  async createOrderWithShipping(
    createShippingDto: CreateShippingDto,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const shipping = await this.shippingService.create(createShippingDto);
    console.log('shipping :>> ', shipping);
    createOrderDto.shippingId = shipping.id;
    return await this.orderRepository.save(createOrderDto);
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  // Récupérer toutes les commandes par leur userId
  async findAllOrdersByUserId(userId: number) {
    return await this.orderRepository.find({ where: { userId: userId } });
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: number) {
    return await this.orderRepository.delete(id);
  }
}
