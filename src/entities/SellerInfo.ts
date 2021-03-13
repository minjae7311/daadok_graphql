import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
} from "typeorm";

@Entity()
class SellerInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "jsonb" })
  form: JSON;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default SellerInfo;
