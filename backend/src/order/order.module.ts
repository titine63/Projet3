import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ShippingModule } from './../shipping/shipping.module';
import { ShippingService } from './../shipping/shipping.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ShippingModule],
  controllers: [OrderController],
  providers: [OrderService, ShippingService],
  exports: [OrderService, TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
