import { Resolvers } from "../../../types/resolvers";
import Product from "../../../entities/Product";
import {
  GetSellerProductResponse,
  GetSellerProductQueryArgs,
} from "../../../types/graph";
const winston = require("../../../config/winston");

// 상품 상세 정보 가져오기
const resolvers: Resolvers = {
  Query: {
    GetSellerProduct: async (
      _res,
      args: GetSellerProductQueryArgs,
      { req }
    ): Promise<GetSellerProductResponse> => {
      const { sellerId } = args;

      try {
        const product = await Product.find({
          where: { seller: sellerId },
          relations: ["subproduct"],
        });

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
        winston.info("Get-Seller Product : " + e.message);
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
