/** @format */

import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
  } from "typeorm";
  
  @Entity()
  class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "text", nullable: true })
    photoUrl: string;
  
    @Column({ type: "boolean", nullable: false })
    active: boolean;

    @Column({ type: "text", nullable: true })
    title: string;

    @Column({ type: "text", nullable: true })
    date: string;
  
    @CreateDateColumn()
    createdAt: string;
  
    @CreateDateColumn()
    updatedAt: string;
  
    @DeleteDateColumn()
    deletedAt: string;
  }
  
  export default Event;
  