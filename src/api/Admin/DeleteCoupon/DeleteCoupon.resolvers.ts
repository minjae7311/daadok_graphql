import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  DeleteCouponMutationArgs,
  DeleteCouponResponse,
} from "../../../types/graph";
import Coupon from "../../../entities/Coupon";
const winston = require("../../../config/winston");

// 관리자 권한 - 선택 쿠폰 목록 지우기
const resolvers: Resolvers = {
  Mutation: {
    DeleteCoupon: adminPrivateResolvers(
      async (
        _res,
        args: DeleteCouponMutationArgs,
        { req }
      ): Promise<DeleteCouponResponse> => {
        const { couponId } = args;

        try {
          const coupon = await Coupon.findOne({
            id: couponId!,
          });
          if (!coupon) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          await coupon.softRemove();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info(e.message)
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
