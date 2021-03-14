import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import Product from "./Product";
import Cart from "./Cart"

@Entity()
class SubProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  title: string;

  @Column({ type: "double precision", nullable: true })
  price: number;

  @ManyToOne(() => Product, (product) => product.subproduct, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  product: Product;

  @OneToMany(() => Cart, (cart) => cart.subproduct, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  cart: Cart;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default SubProduct;
