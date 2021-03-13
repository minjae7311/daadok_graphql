import { Resolvers } from "../../../types/resolvers";
import Product from "../../../entities/Product";
import {
  GetCurationProductResponse,
  GetCurationProductQueryArgs,
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
const winston = require("../../../config/winston");

// curation 답변 완료 후 상품 추천 (키워드 매칭)
const resolvers: Resolvers = {
  Query: {
    GetCurationProduct: privateResolver(
      async (
        _res,
        args: GetCurationProductQueryArgs,
        { req }
      ): Promise<GetCurationProductResponse> => {
        const { sellerId, answeredJson } = args;

        try {
          const product = await Product.createQueryBuilder("product")
            .leftJoinAndSelect("product.seller", "seller")
            .where("product.keyword @> :keyword", {
              keyword: { keyword: answeredJson },
            })
            .andWhere("product.seller = :seller", { seller: sellerId })
            .getMany();

          return {
            ok: true,
            error: null,
            product,
          };
        } catch (e) {
          winston.info("From "+" Get-Curation-Product : "+e.message);
          return {
            ok: false,
            error: e.message,
            product: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
