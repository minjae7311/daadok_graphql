import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from "typeorm";
import { paymentStatus } from "../types/types";
import Credit from "./Credit";
import Product from "./Product";
import Subscription from "./Subscription";

@Entity()
class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Credit, (credit) => credit.payment, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  credit: Credit;

  @ManyToOne(() => Product, (product) => product.payment, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Subscription, (subscription) => subscription.payment, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  subscription: Subscription;

  // @Column({ type: "double precision", default: 0 })
  // price: number;

  @Column({
    type: "text",
    enum: ["CREATED", "PAYED", "CANCELLED"],
    default: "CREATED",
  })
  status: paymentStatus;

  @Column({ type: "text", nullable: true })
  reason: string;

  @Column({ type: "text", nullable: true })
  date: string;

  @Column({ type: "text", nullable: true })
  imp_uid: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Payment;
