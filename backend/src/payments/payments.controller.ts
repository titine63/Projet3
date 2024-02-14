// payments.controller.ts
import { Controller, Get, Query, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from '../payments/entities/payment.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async getAllPayments(): Promise<any[]> {
    return await this.paymentsService.findAll();
  }

  @Get('paypal')
  async getAllPaymentsByPaypal(): Promise<any[]> {
    return await this.paymentsService.findByMethod('Paypal');
  }

  @Get('byDate')
  async getAllPaymentsByDate(@Query('date') date: string): Promise<any[]> {
    return await this.paymentsService.findByDate(date);
  }

  @Get('byUser/:userId')
  async getAllPaymentsByUser(
    @Param('userId') userId: number,
  ): Promise<Payment[]> {
    return await this.paymentsService.findByUser(userId);
  }
}
