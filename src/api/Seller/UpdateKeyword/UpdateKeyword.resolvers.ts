import { Resolvers } from "../../../types/resolvers";
import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
import {
  UpdateKeywordMutationArgs,
  UpdateKeywordResponse,
} from "../../../types/graph";
import Keyword from "../../../entities/Keyword";
import Product from "../../../entities/Product";
import { In } from "typeorm";
const winston = require("../../../config/winston");

// 관리자 권한 - 상품 키워드 등록
const resolvers: Resolvers = {
  Mutation: {
    UpdateKeyword: sellerPrivateResolvers(
      async (
        _res,
        args: UpdateKeywordMutationArgs,
        { req }
      ): Promise<UpdateKeywordResponse> => {
        const { productId, keywordIds } = args;

        try {
          const keyword = await Keyword.find({
            where: { id: In(keywordIds) },
          });

          const product = await Product.findOne({
            where: { id: productId },
          });

          if (product) {
            product.keyword = keyword;
            await product.save();

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "product-not-found",
            };
          }
        } catch (e) {
          winston.info("Update-Keyword : "+e.message);
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
