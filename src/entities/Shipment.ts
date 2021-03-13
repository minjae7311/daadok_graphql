import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import Subscription from "./Subscription";

@Entity()
class Shipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  status: string;

  @OneToMany(() => Subscription, (subscription) => subscription.shipment, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  subscription: Subscription[];

  @Column({ type: "boolean", nullable: false, default: false })
  complete: boolean;

  @Column({ type: "text", nullable: false })
  tracking_number: string;

  @Column({ type: "text", nullable: true })
  location: string;

  @Column({ type: "text", nullable: false })
  courier_code: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Shipment;
