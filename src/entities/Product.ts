import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, DeleteDateColumn, ManyToOne, JoinColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
import Review from "./Review";
import Category from "./Category";
import SubCategory from "./SubCategory";
import Payment from "./Payment";
import Discount from "./Discount";
import ViewedProduct from "./ViewedProduct";
import Cart from "./Cart";
import Dibs from "./Dibs";
import Seller from "./Seller";
import Enquiry from "./Enquiry";
import Keyword from "./Keyword";
import Subscription from "./Subscription";
import SubProduct from "./SubProduct"

@Entity()
class Product extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", nullable: true })
	brandName: string;

	@Column({ type: "text", nullable: true })
	title: string;

	@Column({ type: "text", nullable: true })
	subtitle: string;

	@Column({ type: "text", nullable: true })
	description: string;

	@Column({ type: "jsonb", nullable: true })
	shipment_term: JSON;

	@Column({ type: "jsonb", nullable: true })
	optional_date: JSON;

	@Column({ type: "jsonb", nullable: true })
	add_choice_option: JSON;

	@Column({ type: "double precision", nullable: true, default: 0 })
	ship_charge: number;

	@Column({ type: "double precision", nullable: true, default: 0 })
	reduced_price: number;

	@Column({ type: "double precision", nullable: true, default: 0 })
	subscript_num: number;

	@Column({ type: "double precision", nullable: true })
	grade: number;

	@Column({ type: "text", nullable: true })
	product_top_photo_app: string;

	@Column({ type: "jsonb", nullable: true })
	product_banner_photo_app: JSON;

	@Column({ type: "text", nullable: true })
	product_detail_photo_app: string;

	@Column({ type: "text", nullable: true })
	product_top_photo_web: string;

	@Column({ type: "jsonb", nullable: true })
	product_banner_photo_web: JSON;

	@Column({ type: "text", nullable: true })
	product_detail_photo_web: string;

	@Column({ type: "text", nullable: true })
	hash_tag: string;

	@Column({ type: "text", nullable: true })
	mandatory: string;

	@OneToMany(() => SubProduct, (subproduct) => subproduct.product, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	subproduct: SubProduct[];

	@ManyToOne(() => Seller, (seller) => seller.product, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	seller: Seller;

	@ManyToOne(() => Category, (category) => category.product, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	category: Category;

	@ManyToOne(() => SubCategory, (subcategory) => subcategory.product, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	subcategory: SubCategory;

	@OneToMany(() => Payment, (payment) => payment.product, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	payment: Payment[];

	@OneToMany(() => Subscription, (subscription) => subscription.product, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	subscription: Subscription[];

	@OneToOne(() => Discount, (discount) => discount.product, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	discount: Discount;

	@OneToMany(() => Review, (review) => review.product, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	review: Review[];

	@OneToMany(() => ViewedProduct, (viewedproduct) => viewedproduct.product, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	viewedProduct: ViewedProduct[];

	@OneToMany(() => Enquiry, (enquiry) => enquiry.product, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	enquiry: Enquiry[];

	@OneToMany(() => Cart, (cart) => cart.product)
	cart: Cart[];

	@OneToMany(() => Dibs, (dibs) => dibs.product)
	dibs: Dibs[];

	@ManyToMany((type) => Keyword, (keyword) => keyword.product)
	@JoinTable()
	keyword: Keyword[];

	@Column({ type: "jsonb", nullable: true })
	seller_info: JSON;

	@Column({ type: "jsonb", nullable: true })
	mandatory_notice: JSON;

	@Column({ type: "jsonb", nullable: true })
	exchange_info: JSON;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	deletedAt: string;
}

export default Product;
