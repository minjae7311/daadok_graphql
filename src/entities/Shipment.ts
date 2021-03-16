import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, DeleteDateColumn, JoinColumn } from "typeorm";
import { shipmentStatus } from "../types/types";
import Subscription from "./Subscription";

@Entity()
class Shipment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", enum: ["PREPARING", "STARTED", "COMPLETED", "REFUND_REQUESTED", "REFUND_STARTED", "REFUND_COMPLETED"], nullable: true })
	status: shipmentStatus;

	@OneToMany(() => Subscription, (subscription) => subscription.shipment, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	subscription: Subscription[];

	@Column({ type: "boolean", nullable: false, default: false })
	complete: boolean;

	@Column({ type: "text", nullable: false })
	tracking_number: string;

	@Column({ type: "text", nullable: true })
	location: string;

	@Column({ type: "text", nullable: false })
	courier_code: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	deletedAt: string;
}

export default Shipment;
