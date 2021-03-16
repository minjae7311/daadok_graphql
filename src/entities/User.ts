import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from "typeorm";
import bcrypt from "bcrypt";
import Interest from "./Interest";
import Credit from "./Credit";
import Review from "./Review";
import CustomerService from "./CustomerService";
import ViewedProduct from "./ViewedProduct";
import Cart from "./Cart";
import Dibs from "./Dibs";
import CurationAnswer from "./CurationAnswer";
import Address from "./Address";
import SearchWord from "./SearchWord";
import Coupon from "./Coupon";
import Subscription from "./Subscription"

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  loginId: string;

  @Column({ type: "text", nullable: false })
  loginPw: string;

  @Column({ type: "boolean", nullable: false, default: false })
  sns_login: boolean;

  @Column({ type: "text", nullable: true })
  fullName: string;

  @Column({ type: "text", nullable: true })
  birthDate: string;

  /**
   * @todo default photoUrl
   */

  @Column({ type: "text", nullable: true })
  gender: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "text", nullable: false, default: "" })
  deviceId: string;

  @Column({ type: "boolean", nullable: true, default: false })
  eventAlarm: boolean;

  @Column({ type: "text", default: "DEFAULT_PHOTO_URL" })
  profilePhotoUrl: string;

  @ManyToMany((type) => Interest)
  @JoinTable()
  interest: Interest[];

  @OneToMany(() => Review, (review) => review.user, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  review: Review[];

  @OneToMany(() => CustomerService, (customerService) => customerService.user, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  customerService: CustomerService[];

  @OneToMany(() => Credit, (credit) => credit.user, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  credit: Credit[];

  @OneToMany(() => Address, (address) => address.user, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  address: Address[];

  @OneToMany(() => Coupon, (coupon) => coupon.user, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  coupon: Coupon[];

  @OneToMany(() => ViewedProduct, (viewedProduct) => viewedProduct.user)
  viewedProduct: ViewedProduct[];

  @OneToMany(() => SearchWord, (searchword) => searchword.user)
  searchWord: SearchWord[];

  @OneToMany(() => CurationAnswer, (curationAnswer) => curationAnswer.user)
  curationAnswer: CurationAnswer[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToMany(() => Dibs, (dibs) => dibs.user)
  dibs: Dibs[];

  @Column({ type: "text", nullable: true })
  pushToken: string;

  @Column({ type: "double precision", nullable: true, default: 0 })
  friend_recommend: number;

  @Column({ type: "text", nullable: true})
  messaging_token: string;

  @OneToMany(() => Subscription, (subscription) => subscription.user, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  subscription: Subscription;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  @BeforeInsert()
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

export default User;
