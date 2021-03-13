import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetCategoryListQueryArgs,
  GetCategoryListResponse,
} from "../../../types/graph";
import Category from "../../../entities/Category";
const winston = require("../../../config/winston");

// 관리자 권한 - 유저 리스트 page 별로 가져오기
const resolvers: Resolvers = {
  Query: {
    GetCategoryList: adminPrivateResolvers(
      async (
        _res,
        args: GetCategoryListQueryArgs,
        { req }
      ): Promise<GetCategoryListResponse> => {
        const { page } = args;

        try {
          const category = await Category.find({
            order: { id: "ASC" },
            skip: page,
            take: 10,
            withDeleted: true
          });

          return {
            ok: true,
            error: null,
            category,
          };
        } catch (e) {
          winston.info(e.message)
          return {
            ok: false,
            error: e.message,
            category: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
