import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import Product from "./Product";
import bcrypt from "bcrypt";
import CurationForm from "./CurationForm";
import Keyword from "./Keyword";
import Category from "./Category";
import SubCategory from "./SubCategory";
import Banner from "./Banner";

const BCRYPT_ROUNDS = 10;

@Entity()
class Seller extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  loginId: string;

  @Column({ type: "text", nullable: false })
  loginPw: string;

  @Column({ type: "text", nullable: true })
  brandName: string;

  @Column({ type: "text", nullable: true })
  bankAccount: string;

  @Column({ type: "text", nullable: true })
	brand_thumbnail_app: string;

  @Column({ type: "text", nullable: true })
	brand_detail_photo_app: string;

  @Column({ type: "text", nullable: true })
	brand_story: string;

  @Column({ type: "text", nullable: true })
	brand_thumbnail_web: string;

  @Column({ type: "text", nullable: true })
	brand_detail_photo_web: string;

  @Column({ type: "text", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "jsonb", nullable: true })
  recommend_product: JSON;

  @OneToMany(() => Product, (product) => product.seller, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  product: Product[];

  @OneToMany(() => CurationForm, (curationform) => curationform.seller, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  curationform: CurationForm;

  @ManyToMany((type) => Keyword, (keyword) => keyword.seller)
  @JoinTable()
  keyword: Keyword[];

  @ManyToOne(() => Category, (category) => category.seller, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  category: Category;

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.seller, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  subcategory: SubCategory;

  @OneToOne(() => Banner, (banner) => banner.seller, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  banner: Banner;

  @Column({ type: "text", nullable: true, default: "#" })
  hash_tag: string;

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

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  public async comparePassword(password: string): Promise<Boolean> {
    return bcrypt.compare(password, this.loginPw);
  }
}

export default Seller;
