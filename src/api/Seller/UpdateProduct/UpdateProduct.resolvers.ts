import { Resolvers } from "../../../types/resolvers";
import {
  UpdateProductMutationArgs,
  UpdateProductResponse,
} from "../../../types/graph";
// import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
import Product from "../../../entities/Product";
const winston = require("../../../config/winston");

// 판매자 권한 - 등록 상품 세부사항 수정
const resolvers: Resolvers = {
  Mutation: {
    UpdateProduct: (
      async (
        _,
        args: UpdateProductMutationArgs,
        { req }
      ): Promise<UpdateProductResponse> => {

        try {
          const product = await Product.findOne(
            { id: args.productId },
            { relations: ["seller"] }
          );
          const inputArgs = Object.keys(cleanNullArgs(args));

          if (!product) {
            return {
              ok: false,
              error: "product-not-found",
            };
          }

          if (product) {
            inputArgs.forEach((key) => {
              product[key] = args[key];
            });

            await product.save();

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
          winston.info("Update-Product : "+e.message);
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
