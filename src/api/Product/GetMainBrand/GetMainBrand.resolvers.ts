import { Resolvers } from "../../../types/resolvers";
import Seller from "../../../entities/Seller";
import Category from "../../../entities/Category";
import { GetMainBrandResponse } from "../../../types/graph";
import shuffleArray from "../../../utils/shuffleArray";
const winston = require("../../../config/winston");

// 메인 페이지 카테고리별 상품들 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMainBrand: async (
      _res,
      _args,
      { req }
    ): Promise<GetMainBrandResponse> => {
      try {
        const category = await Category.find({});
        const categoryId = category.map((item) => item.id);

        const items: any[] = [];

        const searchItem = async (array) => {
          for (const item of array) {
            const products = await Seller.find({
              where: { category: item },
              relations: ["category"],
            });

            items.push(products);
          }
          return items;
        };

        const search = await searchItem(categoryId);
        const flatten = (arr) => {
          return arr.reduce((flat, toFlatten) => {
            return flat.concat(
              Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
            );
          }, []);
        };
        const products = await flatten(search);

        const random = shuffleArray(products).slice(0,8) 

        return {
          ok: true,
          error: null,
          seller: random,
        };
      } catch (e) {
        winston.info("Get-MainBrand : "+e.message);
        return {
          ok: false,
          error: e.message,
          seller: null,
        };
      }
    },
  },
};

export default resolvers;
