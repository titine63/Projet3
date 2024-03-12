//user.entity.ts
import { Shipping } from './../../shipping/entities/shipping.entity';
import { Order } from './../../order/entities/order.entity';
import { Product } from './../../product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  pseudo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  picture: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.user, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  product: Product[];

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  order: Order[];

  @OneToMany(() => Shipping, (shipping) => shipping.user, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  shipping: Shipping[];

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
