/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import User from "./User";
import Product from "./Product";

@Entity()
class ViewedProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.viewedProduct)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, (product) => product.viewedProduct)
  @JoinColumn()
  product: Product;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default ViewedProduct;
