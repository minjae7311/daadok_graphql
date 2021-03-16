import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from "typeorm";
import Product from "./Product";
import Seller from "./Seller";

@Entity()
class Keyword extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  key: string; // age, gender, property ...

  @Column({ type: "text" })
  value: string; // 20, male, stamina

  @ManyToMany((type) => Product, (product) => product.keyword)
  product: Product[];

  @ManyToMany((type) => Seller, (seller) => seller.keyword)
  seller: Seller[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Keyword;

/*
 * id   |    key        |     value
 * -----------------------------
 * 1    | age           |  20
 * 2    | age           |  30
 * 3    | propety       | stamina
 * 4    | gender        | male
 * 5    | property      | medicine
 * 6    | gender        | female
 * 7    | property      | lazor
 * 8    | property      | shaving form
 * .
 * .
 * .
 *
 *
 */
