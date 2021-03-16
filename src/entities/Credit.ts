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
  OneToMany,
} from "typeorm";
import User from "./User";
import Payment from "./Payment";

@Entity()
class Credit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.credit, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Payment, (payment) => payment.credit, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  payment: Payment[];

  @Column({ type: "text", nullable: true })
  nickname: string;

  @Column({ type: "text", nullable: true })
  card_name: string;

  @Column({ type: "text", nullable: true })
  card_number: string;

  @Column({ type: "text", nullable: true })
  expiry: string;

  @Column({ type: "boolean", nullable: false, default: false })
  isMain: boolean;

  @Column({ type: "text", nullable: true })
  pwd_2digit: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Credit;
