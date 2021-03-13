import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, DeleteDateColumn, JoinColumn, OneToMany } from "typeorm";
import Shipment from "./Shipment";
import Payment from "./Payment";
import Address from "./Address";
import User from "./User";
import Product from "./Product";
import { subscriptionStatus } from "../types/types";

@Entity()
class Subscription extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", enum: ["SUBSCRIBING", "NOT_SUBSCRIBING"], nullable: true, default: "SUBSCRIBING" })
	status: subscriptionStatus;

	@OneToMany(() => Payment, (payment) => payment.subscription, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	payment: Payment[];

	@Column({ type: "double precision", nullable: true })
	amount: number;

	@ManyToOne(() => Product, (product) => product.payment, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	product: Product;

	@Column({ type: "text", nullable: true })
	option: string;

	@ManyToOne(() => Address, (address) => address.subscription, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	address: Address;

	@ManyToOne(() => User, (user) => user.subscription, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	user: User;

	@Column({ type: "text", nullable: true })
	wanted_date: string;

	@ManyToOne(() => Shipment, (shipment) => shipment.subscription, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	shipment: Shipment;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	deletedAt: string;
}

export default Subscription;
