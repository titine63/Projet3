import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './../../users/user.entity/user.entity';
import { Shipping } from './../../shipping/entities/shipping.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  status: string;

  @Column({ length: 20 })
  paymentMethod: string;

  @ManyToOne(() => User, (user) => user.order, {
    cascade: false,
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Shipping, (shipping) => shipping.order, {
    cascade: false,
    nullable: false,
  })
  shipping: Shipping;

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
