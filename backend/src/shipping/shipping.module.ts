import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipping])],
  controllers: [ShippingController],
  providers: [ShippingService],
  exports: [ShippingService, TypeOrmModule.forFeature([Shipping])],
})
export class ShippingModule {}
