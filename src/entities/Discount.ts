import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import Product from "./Product";

@Entity()
class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product, (product) => product.discount, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  product: Product;

  @Column({ type: "double precision", nullable: true })
  reduced_price: number;

  @Column({ type: "boolean", default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Discount;
