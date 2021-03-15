/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  Column
} from "typeorm";
import User from "./User";
import Product from "./Product";
import SubProduct from "./SubProduct"

@Entity()
class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, (product) => product.cart)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => SubProduct, (subproduct) => subproduct.cart)
  @JoinColumn()
  subproduct: SubProduct;

  @Column({ type: "text", nullable: true })
  shipment_term: string;

  @Column({ type: "text", nullable: true })
  wanted_date: string;

  @Column({ type: "text", nullable: true })
  add_choice_option: string;

  @Column({ type: "double precision", nullable: true })
  amount: number;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Cart;
