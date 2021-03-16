import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  DeleteCategoryMutationArgs,
  DeleteCategoryResponse,
} from "../../../types/graph";
import Category from "../../../entities/Category";
const winston = require("../../../config/winston");

// 관리자 권한 - 선택 카테고리 지우기
const resolvers: Resolvers = {
  Mutation: {
    DeleteCategory: adminPrivateResolvers(
      async (
        _res,
        args: DeleteCategoryMutationArgs,
        { req }
      ): Promise<DeleteCategoryResponse> => {
        const { categoryId } = args;

        try {
          const category = await Category.findOne({
            id: categoryId!,
          });
          if (!category) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          await category.softRemove();

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
