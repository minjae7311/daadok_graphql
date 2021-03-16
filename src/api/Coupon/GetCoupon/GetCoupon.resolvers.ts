import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetCouponResponse } from "../../../types/graph";
import Coupon from "../../../entities/Coupon";
const winston = require("../../../config/winston");

// 유저 권한 - 쿠폰 가져오기
const resolvers: Resolvers = {
  Query: {
    GetCoupon: privateResolver(
      async (_res, _args, { req }): Promise<GetCouponResponse> => {
        const { user } = req;

        try {
          const coupon = await Coupon.find({ user: user.id });

          return {
            ok: true,
            error: null,
            coupon,
          };
        } catch (e) {
          winston.info("Get-Coupon : "+e.message);
          return {
            ok: false,
            error: e.message,
            coupon: null,
          };
        }
      }
    ),
  },
};

export default resolvers;

