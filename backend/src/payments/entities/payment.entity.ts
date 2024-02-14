//payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order)
  order: Order;

  @Column({ type: 'timestamp' })
  payment_received_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  payment_to_seller_date: Date | null;

  @Column('decimal')
  amount: number;

  @Column('decimal')
  commission: number;

  @Column({ type: 'varchar', length: 20 })
  payment_method: string;

  @Column({ type: 'varchar', length: 20 })
  payment_status: string;
}
