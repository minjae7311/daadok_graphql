import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  class SearchRank extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "text", nullable: true })
    search: string;

    @Column({ type: "double precision", nullable: true, default: 0 })
    count: number;
  
    @CreateDateColumn()
    createdAt: string;
  
    @CreateDateColumn()
    updatedAt: string;
  
    @DeleteDateColumn()
    deletedAt: string;
  }
  
  export default SearchRank;
  