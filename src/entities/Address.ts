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
  OneToMany
} from "typeorm";
import User from "./User";
import Subscription from "./Subscription"

@Entity()
class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.address, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @Column({ type: "text", nullable: true })
  user_name: string;

  @Column({ type: "text", nullable: true })
  located: string;

  @Column({ type: "text", nullable: true })
  detail: string;

  @Column({ type: "boolean", nullable: false, default: false })
  isMain: boolean;

  @Column({ type: "text", nullable: true})
  phoneNumber: string;

  @OneToMany(() => Subscription, (subscription) => subscription.address, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  subscription: Subscription;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Address;
