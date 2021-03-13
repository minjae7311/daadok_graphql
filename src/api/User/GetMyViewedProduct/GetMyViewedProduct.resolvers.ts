import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyViewedProductResponse } from "../../../types/graph";
import ViewedProduct from "../../../entities/ViewedProduct";
const winston = require("../../../config/winston");

// 유저 권한 - 검색한 단어들 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMyViewedProduct: privateResolver(
      async (_res, _args, { req }): Promise<GetMyViewedProductResponse> => {
        const { user } = req;

        try {
          const viewedProduct = await ViewedProduct.find({
            where: { user: user },
            order: { updatedAt: "DESC" },
            relations: ["product"],
          });

          if (viewedProduct) {
            return {
              ok: true,
              error: null,
              viewedProduct,
            };
          } else {
            return {
              ok: false,
              error: "viewedProduct-not-found",
              viewedProduct: null,
            };
          }
        } catch (e) {
          winston.info("Get-MyViewed-Product : "+e.messag);
          return {
            ok: false,
            error: e.message,
            viewedProduct: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
