import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import Category from "../../../entities/Category";
import {
  AddCategoryMutationArgs,
  AddCategoryResponse,
} from "../../../types/graph";
const winston = require("../../../config/winston");

// 관리자 권한 - 카테고리 추가하기
const resolvers: Resolvers = {
  Mutation: {
    AddCategory: adminPrivateResolvers(
      async (
        _res,
        args: AddCategoryMutationArgs,
        { req }
      ): Promise<AddCategoryResponse> => {
        const { category } = args;

        try {
          const newCategory = await Category.create({
            category
          }).save();

          if (!newCategory) {
            return {
              ok: false,
              error: "failed-to-create-category",
            };
          }

          newCategory.save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info(e.message)
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
