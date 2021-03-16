/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Column,
} from "typeorm";

@Entity()
class Courier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  code: string;

  @Column({ type: "text", nullable: true })
  name: string;

  @Column({ type: "text", nullable: true })
  number: string;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default Courier;
