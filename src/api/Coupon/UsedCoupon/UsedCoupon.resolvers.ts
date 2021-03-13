import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UsedCouponMutationArgs,
  UsedCouponResponse,
} from "../../../types/graph";
import Coupon from "../../../entities/Coupon";
const winston = require("../../../config/winston");

// 유저가 선택한 주소 정보를 제거
const resolvers: Resolvers = {
  Mutation: {
    UsedCoupon: privateResolver(
      async (
        _res,
        args: UsedCouponMutationArgs,
        { req }
      ): Promise<UsedCouponResponse> => {
        const { couponId } = args;

        try {
          const coupon = await Coupon.findOne(
            { id: couponId },
          );

          if (!coupon) {
            return {
              ok: false,
              error: "coupon-not-found",
            };
          }

          await coupon.softRemove();
          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Used-Coupon : "+e.message);

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
