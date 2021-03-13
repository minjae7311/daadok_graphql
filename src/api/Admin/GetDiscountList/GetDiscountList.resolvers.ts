import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetDiscountListQueryArgs,
  GetDiscountListResponse,
} from "../../../types/graph";
import Discount from "../../../entities/Discount";
const winston = require("../../../config/winston");

// 관리자 권한 - 할인 리스트 page 별로 가져오기
const resolvers: Resolvers = {
  Query: {
    GetDiscountList: adminPrivateResolvers(
      async (
        _res,
        args: GetDiscountListQueryArgs,
        { req }
      ): Promise<GetDiscountListResponse> => {
        const { page } = args;

        try {
          const discount = await Discount.find({
            order: { id: "ASC" },
            skip: page,
            take: 10,
            withDeleted: true,
          });

          return {
            ok: true,
            error: null,
            discount,
          };
        } catch (e) {
          winston.info(e.message);
          return {
            ok: false,
            error: e.message,
            discount: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
