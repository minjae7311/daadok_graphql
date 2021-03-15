/** @format */

import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, DeleteDateColumn, OneToOne, JoinColumn } from "typeorm";
import Seller from "./Seller";

@Entity()
class Banner extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", nullable: true })
	head: string;

	@Column({ type: "text", nullable: true })
	content: string;

	@Column({ type: "text", nullable: true })
	photourl_app: string;

	@Column({ type: "text", nullable: true })
	photourl_web: string;

	@OneToOne(() => Seller, (product) => product.banner, {
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

export default Banner;
