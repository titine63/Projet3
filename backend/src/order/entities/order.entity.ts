//order.entity.ts will contain the schema for the order table. The order table will have the following columns:
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './../../users/user.entity/user.entity';
import { Shipping } from './../../shipping/entities/shipping.entity';
import { Product } from './../../product/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, default: 'pending' })
  status: string;

  //@Column({ length: 20 })
  //paymentMethod: string;

  @ManyToOne(() => User, (user) => user.order, {
    cascade: false,
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Shipping, (shipping) => shipping.order, {
    cascade: false,
    nullable: false,
  })
  @JoinColumn({ name: 'shippingId' })
  shipping: Shipping;

  @Column()
  shippingId: number;

  @OneToMany(() => Product, (product) => product.order, {
    cascade: false,
    nullable: true,
  })
  product: Product[];

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
