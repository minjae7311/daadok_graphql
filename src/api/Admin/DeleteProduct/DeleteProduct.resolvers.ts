import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  DeleteProductMutationArgs,
  DeleteProductResponse,
} from "../../../types/graph";
import Product from "../../../entities/Product";
const winston = require("../../../config/winston");

// 관리자 권한 - 상품 목록 지우기
const resolvers: Resolvers = {
  Mutation: {
    DeleteProduct: adminPrivateResolvers(
      async (
        _res,
        args: DeleteProductMutationArgs,
        { req }
      ): Promise<DeleteProductResponse> => {
        const { productId } = args;

        try {
          const product = await Product.findOne({ id: productId });

          if (!product) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          await product.softRemove();

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
