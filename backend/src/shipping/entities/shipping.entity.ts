import { Order } from './../../order/entities/order.entity';
import { User } from './../../users/user.entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  firstname: string;

  @Column({ length: 255 })
  lastname: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 10 })
  postalCode: string;

  @Column({ length: 50 })
  country: string;

  @Column({ length: 20 })
  shippingMethod: string;

  @ManyToOne(() => User, (user) => user.shipping, {
    cascade: false,
    nullable: false,
  })
  user: User;

  @OneToMany(() => Order, (order) => order.shipping, {
    cascade: false,
    nullable: true,
  })
  order: Order[];

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
