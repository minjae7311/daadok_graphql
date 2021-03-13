import { Resolvers } from "../../../types/resolvers";
import {
  EnrollDiscountMutationArgs,
  EnrollDiscountResponse,
} from "../../../types/graph";
import Discount from "../../../entities/Discount";
import Product from "../../../entities/Product";
import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 판매자 권한 - 등록한 상품들에 대하여 할인 금액 제안, 관리자 승인 필요
const resolvers: Resolvers = {
  Mutation: {
    EnrollDiscount: sellerPrivateResolvers(
      async (
        _res,
        args: EnrollDiscountMutationArgs,
        { req }
      ): Promise<EnrollDiscountResponse> => {
        const { seller } = req;
        const notNullArgs = cleanNullArgs(args);

        try {
          const product = await Product.findOne({
            where: { id: args.productId },
            relations: ["seller"],
          });

          if (product?.seller.id == seller.id) {
            await Discount.create({ ...notNullArgs, product }).save();

            // product reduced_price에 할인 금액 넣기
            if (product) {
              product.reduced_price = args.reduced_price;
              await product.save();
            }

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "product-not-matched",
            };
          }
        } catch (e) {
          winston.info("Enroll-Discount : "+e.message);
          return {
            ok: false,
            error: e.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
