import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  DeleteDiscountByAdminMutationArgs,
  DeleteDiscountByAdminResponse,
} from "../../../types/graph";
import Discount from "../../../entities/Discount";
const winston = require("../../../config/winston");

// 관리자 권한 - 할인 목록 지우기
const resolvers: Resolvers = {
  Mutation: {
    DeleteDiscountByAdmin: adminPrivateResolvers(
      async (
        _res,
        args: DeleteDiscountByAdminMutationArgs,
        { req }
      ): Promise<DeleteDiscountByAdminResponse> => {
        const { discountId } = args;

        try {
          const discount = await Discount.findOne({
            id: discountId!,
          });
          if (!discount) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          await discount.softRemove();

          return {
            ok: true,
            error: null,
          };
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
