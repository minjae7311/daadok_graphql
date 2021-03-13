// import { request } from 'request';
import { Resolvers } from "../../../types/resolvers";
import ViewedProduct from "../../../entities/ViewedProduct";
import {
  GetRecommendProductResponse,
  GetRecommendProductQueryArgs,
} from "../../../types/graph";
const winston = require("../../../config/winston");

// 상품 페이지 유저 추천 상품들 가져오기
const resolvers: Resolvers = {
  Query: {
    GetRecommendProduct: async (
      _res,
      args: GetRecommendProductQueryArgs,
      { req }
    ): Promise<GetRecommendProductResponse> => {
      const { productId } = args;

      try {
        const viewed = await ViewedProduct.find({
          where: { product: productId },
          take: 8,
          order: { updatedAt: "DESC" },
          relations: ["user", "product"],
        });

        const otherUser = viewed.map((item) => {
          return item.user.id;
        });

        const items: any[] = [];

        const searchItem = async (array) => {
          for (const item of array) {
            const userProduct = await ViewedProduct.find({
              where: { user: item },
              relations: ["user", "product"],
              order: { updatedAt: "DESC" },
            });

            const find = userProduct.findIndex(
              (e) => e.product.id === productId
            );

            items.push(userProduct[find - 1], userProduct[find + 1]);
          }
          return items;
        };

        const search = await searchItem(otherUser);
        const reducer = (acc, val) => {
          if (val !== undefined) {
            acc.push(val);
          }
          return acc;
        };

        const products = search.reduce(reducer, []);
        const product = products.map((item) => {
          return item.product;
        });

        return {
          ok: true,
          error: null,
          product,
        };
      } catch (e) {
        winston.info("Get-RecommendProduct :"+e.message);
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
