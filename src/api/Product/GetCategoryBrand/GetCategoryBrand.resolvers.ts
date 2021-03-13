import { Resolvers } from "../../../types/resolvers";
import Seller from "../../../entities/Seller";
import {
  GetCategoryBrandResponse,
  GetCategoryBrandQueryArgs,
} from "../../../types/graph";
const winston = require("../../../config/winston");

// 카테고리 별 상품들을 유저가 선택한 순서대로 가져오기
const resolvers: Resolvers = {
  Query: {
    GetCategoryBrand: async (
      _res,
      args: GetCategoryBrandQueryArgs,
      { req }
    ): Promise<GetCategoryBrandResponse> => {
      const { category, subcategory } = args;

      try {
        // if (filter == "인기순") {

        const product = await Seller.createQueryBuilder("seller")
          .leftJoinAndSelect("seller.category", "category")
          .leftJoinAndSelect("seller.subcategory", "subcategory")
          .where([{ category: category }, { subcategory: subcategory }])
          .getMany();

        // 평점 순으로 비교
        // const sort = product.sort((a, b) =>
        //   a.grade < b.grade
        //     ? 1
        //     : a.grade - b.grade >= -0.1 && a.grade - b.grade <= 0.1
        //     ? a.review.length < b.review.length
        //       ? 1
        //       : -1
        //     : -1
        // );

        return {
          ok: true,
          error: null,
          seller: product,
        };
        // } else if (filter == "최신순") {
        //   const product = await Product.find({
        //     where: [{ category: category }, { subcategory: subcategory }],
        //     relations: ["subcategory", "category"],
        //     order: { createdAt: "DESC" },
        //   });

        //   return {
        //     ok: true,
        //     error: null,
        //     product,
        //   };
        // } else if (filter == "낮은 가격순") {
        //   const product = await Product.find({
        //     where: [{ category: category }, { subcategory: subcategory }],
        //     relations: ["subcategory", "category"],
        //     order: { price: "ASC" },
        //   });

        //   return {
        //     ok: true,
        //     error: null,
        //     product,
        //   };
        // } else if (filter == "높은 가격순") {
        //   const product = await Product.find({
        //     where: [{ category: category }, { subcategory: subcategory }],
        //     relations: ["subcategory", "category"],
        //     order: { price: "DESC" },
        //   });

        //   return {
        //     ok: true,
        //     error: null,
        //     product,
        //   };
        // } else {
        //   const product = await Product.find({
        //     where: [{ category: category }, { subcategory: subcategory }],
        //     relations: ["subcategory", "category"],
        //     order: { subscript_num: "DESC" },
        //   });

        //   return {
        //     ok: true,
        //     error: null,
        //     product,
        //   };
        // }
      } catch (e) {
        winston.info("Get-Category-Brand : "+e.message);
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
