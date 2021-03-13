import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  Column,
} from "typeorm";
import User from "./User";

@Entity()
class SearchWord extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.searchWord)
  @JoinColumn()
  user: User;

  @Column({ type: "text", nullable: true })
  search: string;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export default SearchWord;
