import Product from "../../../entities/Product";
import { Resolvers } from "../../../types/resolvers";
import {
  EnrollProductMutationArgs,
  EnrollProductResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
// import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
const winston = require("../../../config/winston");

// 판매자 권한 - 상품 등록
const resolvers: Resolvers = {
  Mutation: {
    EnrollProduct: (
      async (
        _res,
        args: EnrollProductMutationArgs,
        { req }
      ): Promise<EnrollProductResponse> => {
        const notNullArgs = cleanNullArgs(args);
        try {
          const enrollProduct = await Product.create({
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
              error: "failed-to-enroll-product",
            };
          }
        } catch (e) {
          winston.info("Enroll-Product : "+e.message);
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
