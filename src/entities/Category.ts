/** @format */

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import Product from "./Product";
import SubCategory from "./SubCategory";
import Seller from "./Seller"

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  category: string;

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  subcategory: SubCategory[];

  @OneToMany(() => Product, (product) => product.category, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  product: Product[];

  @OneToMany(() => Seller, (seller) => seller.category, {
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

export default Category;
