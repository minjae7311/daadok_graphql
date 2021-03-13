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
import CurationForm from "./CurationForm";

@Entity()
class CurationAnswer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.curationAnswer, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => CurationForm, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  @JoinColumn()
  curationForm: CurationForm;

  @Column({ type: "jsonb" })
  answeredJson: JSON;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default CurationAnswer;
