import { Resolvers } from "../../../types/resolvers";
import Category from "../../../entities/Category";
import { GetAllCategoryResponse } from "../../../types/graph";
const winston = require("../../../config/winston");

// 카테고리 및 서브 카테고리 목록 가져오기
const resolvers: Resolvers = {
  Query: {
    GetAllCategory: async (_res, _args, _): Promise<GetAllCategoryResponse> => {
      try {
        const category = await Category.find({
          relations: ["subcategory", "seller"],
          order: { id: "ASC" },
        });

        // 실제 상품 등록 후 n개 이상으로 수정하기
        const show = category.filter((element) => element.seller.length > 0);

        return {
          ok: true,
          error: null,
          category: show,
        };
      } catch (e) {
        winston.info("Get-AllCategory : "+e.message);
        return {
          ok: false,
          error: e.message,
          category: null,
        };
      }
    },
  },
};

export default resolvers;
