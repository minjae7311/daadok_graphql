import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetProductListQueryArgs,
  GetProductListResponse,
} from "../../../types/graph";
import Product from "../../../entities/Product";
const winston = require("../../../config/winston");

// 관리자 권한 - 상품 리스트 page 별로 가져오기
const resolvers: Resolvers = {
  Query: {
    GetProductList: adminPrivateResolvers(
      async (
        _res,
        args: GetProductListQueryArgs,
        { req }
      ): Promise<GetProductListResponse> => {
        const { page } = args;

        try {
          const product = await Product.find({
            order: { id: "ASC" },
            skip: page,
            take: 10,
            withDeleted: true,
          });

          return {
            ok: true,
            error: null,
            product,
          };
        } catch (e) {
          winston.info(e.message);
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
