import { Resolvers } from "../../../types/resolvers";
import Product from "../../../entities/Product";
import { GetProductResponse, GetProductQueryArgs } from "../../../types/graph";
const winston = require("../../../config/winston");

// 상품 상세 정보 가져오기
const resolvers: Resolvers = {
  Query: {
    GetProduct: async (
      _res,
      args: GetProductQueryArgs,
      { req }
    ): Promise<GetProductResponse> => {
      const { productId } = args;

      try {
        const product = await Product.createQueryBuilder("product")
          .leftJoinAndSelect("product.seller", "seller")
          .where({ id: productId })
          .getOne();

        if (!product) {
          return {
            ok: false,
            error: "product-not-found",
            product: null,
          };
        }
        return {
          ok: true,
          error: null,
          product,
        };
      } catch (e) {
        winston.info("Get-Product : "+e.message);
        return {
          ok: false,
          error: e.message,
          product: null,
        };
      }
    },
  },
};

export default resolvers;
