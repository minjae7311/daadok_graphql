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
import User from "./User";

@Entity()
class CustomerService extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  status: string;

  @ManyToOne(() => User, (user) => user.customerService, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @Column({ type: "text", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "text", nullable: true })
  answer: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default CustomerService;
