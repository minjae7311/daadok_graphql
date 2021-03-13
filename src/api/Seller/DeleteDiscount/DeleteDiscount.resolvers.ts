import { Resolvers } from "../../../types/resolvers";
// import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
import {
  DeleteDiscountMutationArgs,
  DeleteDiscountResponse,
} from "../../../types/graph";
import Discount from "../../../entities/Discount";
import Product from "../../../entities/Product";
const winston = require("../../../config/winston");

// 판매자 권한 - 할인 목록 지우기
const resolvers: Resolvers = {
  Mutation: {
    DeleteDiscount: async (
      _res,
      args: DeleteDiscountMutationArgs,
      { req }
    ): Promise<DeleteDiscountResponse> => {
      const { discountId } = args;

      try {
        const discount = await Discount.findOne({
          where: { id: discountId },
          relations: ["product"],
        });

        if (!discount) {
          return {
            ok: false,
            error: "not-found",
          };
        }

        await discount.softRemove();

        // product reduced_price 다시 0원으로 만들기
        const product = await Product.findOne({
          id: discount.product.id,
        });

        if (product) {
          product.reduced_price = 0;
          await product.save();
        }

        return {
          ok: true,
          error: null,
        };
      } catch (e) {
        winston.info("Delete-Discount : "+e.message);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
