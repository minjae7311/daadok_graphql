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
class MandatoryInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text",  nullable: true })
  category: string;

  @Column({ type: "jsonb",  nullable: true })
  info: JSON;

  @Column({ type: "jsonb",  nullable: true })
  form: JSON;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default MandatoryInfo;
