import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetCouponListQueryArgs,
  GetCouponListResponse,
} from "../../../types/graph";
import Coupon from "../../../entities/Coupon";
const winston = require("../../../config/winston");

// 관리자 권한 - 쿠폰 리스트 page 별로 가져오기
const resolvers: Resolvers = {
  Query: {
    GetCouponList: adminPrivateResolvers(
      async (
        _res,
        args: GetCouponListQueryArgs,
        { req }
      ): Promise<GetCouponListResponse> => {
        const { page } = args;

        try {
          const coupon = await Coupon.find({
            order: { id: "ASC" },
            skip: page,
            take: 10,
            withDeleted: true,
          });

          return {
            ok: true,
            error: null,
            coupon,
          };
        } catch (e) {
          winston.info(e.message);
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
