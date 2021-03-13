/** @format */

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Category from "./Category";
import Product from "./Product";
import Seller from "./Seller";

@Entity()
class SubCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  subcategory: string;

  @ManyToOne(() => Category, (category) => category.subcategory, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  category: Category;

  @OneToMany(() => Product, (product) => product.subcategory, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  product: Product[];

  @OneToMany(() => Seller, (seller) => seller.subcategory, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  seller: Seller[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default SubCategory;
