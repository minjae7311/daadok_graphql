import { Resolvers } from "../../../types/resolvers";
import Product from "../../../entities/Product";
import {
  RecommendProductResponse,
  RecommendProductQueryArgs,
} from "../../../types/graph";
import {In} from "typeorm"
const winston = require("../../../config/winston");

// 상품 상세 정보 가져오기
const resolvers: Resolvers = {
  Query: {
    RecommendProduct: async (
      _res,
      args: RecommendProductQueryArgs,
      { req }
    ): Promise<RecommendProductResponse> => {
      const { recommendId, sellerId } = args;

      try {
        const product = await Product.find({
          where: { id: In(recommendId), seller: sellerId },
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
        winston.info("Get-Recommend Product : " + e.message);
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
