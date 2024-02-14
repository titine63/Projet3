//payments.services.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';
import client from '../payments/payPalConfig';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find();
  }

  async findByMethod(payment_method: string): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { payment_method: payment_method },
    });
  }

  async findByDate(payment_received_date: Date): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { payment_received_date: payment_received_date },
    });
  }

  async findByUser(userId: number): Promise<Payment[]> {
    return this.paymentsRepository
      .createQueryBuilder('payment')
      .innerJoinAndSelect('payment.order', 'order')
      .innerJoin('order.user', 'user', 'user.id = :userId', { userId }) // Order a une relation avec User avec un champ 'id'.
      .getMany();
  }
  async createPaypalPayment(paymentData: {
    productId: number;
    orderId: number;
  }): Promise<any> {
    // Déstructurer `productId` et `orderId` à partir de `paymentData`
    const { productId, orderId } = paymentData;
    // Trouver le produit dans la base de données pour obtenir le prix
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    // Créer une requête PayPal avec les détails de la commande et le prix du produit
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: orderId.toString(), // Utilisez l'orderId comme référence
          amount: {
            currency_code: 'EUR',
            value: product.price.toString(), // Utilisez le prix du produit ici
          },
        },
      ],
    });
    try {
      const response = await client.execute(request);
      return response;
    } catch (error) {
      console.error('Error creating PayPal payment: ', error);
      throw error;
    }
  }
  async capturePayment(orderId: string): Promise<any> {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({} as any); // Vous pouvez passer un corps vide pour une requête de capture simple
    try {
      const capture = await client.execute(request);
      console.log('Capture response', capture);
      // Ici, vous pouvez mettre à jour le statut de la commande dans votre base de données
      return capture.result;
    } catch (error) {
      // Gérer les erreurs ici
      console.error('Error capturing PayPal payment:', error);
      throw error;
    }
  }
  async validateAndProcessPaypalWebhook(
    notificationBody: any,
    headers: any,
  ): Promise<void> {
    // Extraire les informations nécessaires des en-têtes de la requête de webhook
    const transmissionId = headers['paypal-transmission-id'];
    const transmissionTime = headers['paypal-transmission-time'];
    const certUrl = headers['paypal-cert-url'];
    const authAlgo = headers['paypal-auth-algo'];
    const transmissionSig = headers['paypal-transmission-sig'];
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;

    // Créez un objet de vérification de signature de webhook
    const verifySignatureRequest =
      new paypal.notification.VerifyWebhookSignatureRequest();
    verifySignatureRequest.setRequestBody({
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: transmissionSig,
      transmission_time: transmissionTime,
      webhook_id: webhookId,
      webhook_event: notificationBody,
    });

    try {
      // Exécuter la requête de vérification de signature
      const response = await client.execute(verifySignatureRequest);
      // Vérifier si la signature est validée par PayPal
      if (response.statusCode === 200) {
        // La signature est valide. Traitez l'événement webhook ici.
        // Par exemple, capturez le paiement si l'événement est une commande approuvée.
        if (notificationBody.event_type === 'CHECKOUT.ORDER.APPROVED') {
          const paypalOrderId = notificationBody.resource.id;
          await this.capturePayment(paypalOrderId);
          // Mettez à jour le statut de la commande dans votre base de données ici
        }
      } else {
        throw new Error('Webhook signature verification failed');
      }
    } catch (error) {
      console.error('Error validating webhook signature: ', error);
      throw error;
    }
  }
}
