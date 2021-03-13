/** @format */

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
} from "typeorm";
import bcrypt from "bcrypt";

const BCRYPT_ROUNDS = 10;

@Entity()
class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  loginId: string;

  @Column({ type: "text", nullable: false })
  loginPw: string;

  @Column({ type: "text", nullable: true })
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.loginPw) {
      const hashedPassword = await this.hashPassword(this.loginPw);
      this.loginPw = hashedPassword;
    }
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.loginPw);
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default Admin;
