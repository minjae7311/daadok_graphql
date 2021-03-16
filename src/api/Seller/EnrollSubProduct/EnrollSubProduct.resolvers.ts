import SubProduct from "../../../entities/SubProduct";
import { Resolvers } from "../../../types/resolvers";
import {
  EnrollSubProductMutationArgs,
  EnrollSubProductResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
// import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
const winston = require("../../../config/winston");

// 판매자 권한 - 상품 등록
const resolvers: Resolvers = {
  Mutation: {
    EnrollSubProduct: (
      async (
        _res,
        args: EnrollSubProductMutationArgs,
        { req }
      ): Promise<EnrollSubProductResponse> => {
        const notNullArgs = cleanNullArgs(args);
        try {
          const enrollProduct = await SubProduct.create({
            ...notNullArgs,
          }).save();

          if (enrollProduct) {
            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "failed-to-enroll-subproduct",
            };
          }
        } catch (e) {
          winston.info("Enroll-SubProduct : "+e.message);
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
