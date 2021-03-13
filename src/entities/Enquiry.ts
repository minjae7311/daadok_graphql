/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import User from "./User";
import Product from "./Product";

@Entity()
class Enquiry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne((type) => Product, (product) => product.enquiry, {
    onDelete: "CASCADE",
  })
  product: Product;

  @Column({ type: "text", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "text", nullable: true })
  answer: string;

  @Column({ type: "boolean", nullable: false })
  secret: boolean;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Enquiry;
