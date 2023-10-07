import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './../../users/user.entity/user.entity';
import { Order } from './../../order/entities/order.entity';

export enum Category {
  MEN = 'Homme',
  WOMMEN = 'Femme',
  KIDS = 'Enfant',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'varchar', length: 10 })
  size: string;

  @Column({ type: 'varchar', length: 20 })
  clothing_type: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  brand: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  color: string;

  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;

  @Column({ type: 'varchar', length: 20, nullable: true })
  state: string;

  @Column({ type: 'boolean', default: false })
  isSold: boolean;

  @ManyToOne(() => User, (user) => user.product, {
    cascade: false,
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Order, (order) => order.product, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ nullable: true })
  orderId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
