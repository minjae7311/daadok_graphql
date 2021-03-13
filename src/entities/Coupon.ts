import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn
} from "typeorm";
import User from "./User";

@Entity()
class Coupon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  title: string;

  @Column({ type: "double precision", nullable: false })
  price: number;

  @Column({ type: "text", nullable: false })
  code: string;

  @Column({ type: "text", nullable: true })
  expiry: string;

  @Column({ type: "boolean", default: false })
  expired: boolean;

  @ManyToOne(() => User, (user) => user.coupon, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Coupon;
