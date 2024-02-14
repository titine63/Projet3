// PaymentsWebhookController.ts
import { Controller, Post, Body, Headers, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('webhooks')
export class PaymentsWebhookController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('paypal')
  @HttpCode(200)
  async handlePaypalWebhook(
    @Body() body: any,
    @Headers() headers: any,
  ): Promise<void> {
    // le nom de la méthode correspond à celui défini dans le service
    await this.paymentsService.validateAndProcessPaypalWebhook(body, headers);
  }
}
