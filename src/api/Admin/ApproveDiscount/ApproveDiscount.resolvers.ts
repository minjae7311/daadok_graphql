import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  ApproveDiscountMutationArgs,
  ApproveDiscountResponse,
} from "../../../types/graph";
import Discount from "../../../entities/Discount";
const winston = require("../../../config/winston");

// 관리자 권한 - 판매자 핫딜 등록시 승인 관리
const resolvers: Resolvers = {
  Mutation: {
    ApproveDiscount: adminPrivateResolvers(
      async (
        _res,
        args: ApproveDiscountMutationArgs,
        { req }
      ): Promise<ApproveDiscountResponse> => {
        const { discountId } = args;

        try {
          const discount = await Discount.findOne({ id: discountId });

          if (discount) {
            discount.status = true;
            await discount.save();

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "discount-not-found",
            };
          }
        } catch (e) {
          winston.info(e.message);
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
