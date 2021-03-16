import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { AddCouponMutationArgs, AddCouponResponse } from "../../../types/graph";
import Coupon from "../../../entities/Coupon";
import { generateCode } from "../../../utils/generateCode";
const winston = require("../../../config/winston");

// 관리자 권한 - 쿠폰 등록하기
const resolvers: Resolvers = {
  Mutation: {
    AddCoupon: adminPrivateResolvers(
      async (
        _res,
        args: AddCouponMutationArgs,
        { req }
      ): Promise<AddCouponResponse> => {
        const { code, expiry } = args;

        console.log(code, expiry);
        try {
          if (!code) {
            const newCoupon = await Coupon.create({
              code: generateCode(10),
            }).save();

            return {
              ok: true,
              error: null,
              code: newCoupon.code,
            };
          } else {
            const newCoupon = await Coupon.create({ code }).save();

            return {
              ok: true,
              error: null,
              code: newCoupon.code,
            };
          }
        } catch (e) {
          winston.info(e.message);
          return {
            ok: false,
            error: e.message,
            code: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
