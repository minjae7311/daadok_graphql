import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import User from "./User";
import Product from "./Product";

@Entity()
class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.review, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  product: Product;

  @ManyToOne(() => User, (user) => user.review, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "double precision", nullable: true })
  score: number;

  @Column({ type: "text", nullable: true })
  photoUrl: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Review;
