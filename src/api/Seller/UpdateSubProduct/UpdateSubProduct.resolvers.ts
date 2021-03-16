import { Resolvers } from "../../../types/resolvers";
import {
  UpdateSubProductMutationArgs,
  UpdateSubProductResponse,
} from "../../../types/graph";
// import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
import SubProduct from "../../../entities/SubProduct";
const winston = require("../../../config/winston");

// 판매자 권한 - 등록 상품 세부사항 수정
const resolvers: Resolvers = {
  Mutation: {
    UpdateSubProduct: async (
      _,
      args: UpdateSubProductMutationArgs,
      { req }
    ): Promise<UpdateSubProductResponse> => {
      try {
        const subproduct = await SubProduct.findOne({ id: args.subproductId });
        const inputArgs = Object.keys(cleanNullArgs(args));

        if (!subproduct) {
          return {
            ok: false,
            error: "product-not-found",
          };
        }

        if (subproduct) {
          inputArgs.forEach((key) => {
            subproduct[key] = args[key];
          });

          await subproduct.save();

          return {
            ok: true,
            error: null,
          };
        } else {
          return {
            ok: false,
            error: "seller-not-matched",
          };
        }
      } catch (e) {
        winston.info("Update-SubProduct : " + e.message);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
