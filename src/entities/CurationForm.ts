import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Seller from "./Seller";

@Entity()
class CurationForm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "jsonb", nullable: true })
  contentsJson: JSON;

  @Column({ type: "jsonb", nullable: true })
  keywordJson: JSON;

  @Column({ type: "text", nullable: true })
  formTitle: string;

  @ManyToOne(() => Seller, (seller) => seller.curationform, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  seller: Seller;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default CurationForm;
