import { Resolvers } from "../../../types/resolvers";
import SubProduct from "../../../entities/SubProduct";
import { GetSubProductResponse, GetSubProductQueryArgs } from "../../../types/graph";
const winston = require("../../../config/winston");

// 상품 상세 정보 가져오기
const resolvers: Resolvers = {
  Query: {
    GetSubProduct: async (
      _res,
      args: GetSubProductQueryArgs,
      { req }
    ): Promise<GetSubProductResponse> => {
      const { productId } = args;

      try {
        const subproduct = await SubProduct.createQueryBuilder("subproduct")
          .leftJoinAndSelect("subproduct.product", "product")
          .where({ id: productId })
          .getMany();

        if (!subproduct) {
          return {
            ok: false,
            error: "subproduct-not-found",
            subproduct: null,
          };
        }
        return {
          ok: true,
          error: null,
          subproduct,
        };
      } catch (e) {
        winston.info("Get-SubProduct : "+e.message);
        return {
          ok: false,
          error: e.message,
          subproduct: null,
        };
      }
    },
  },
};

export default resolvers;
