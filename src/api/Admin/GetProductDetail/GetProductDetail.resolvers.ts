import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetProductDetailQueryArgs,
  GetProductDetailResponse,
} from "../../../types/graph";
import Product from "../../../entities/Product";
const winston = require("../../../config/winston");

// 관리자 권한 - 상품과 연결된 상세 정보 가져오기
const resolvers: Resolvers = {
  Query: {
    GetProductDetail: adminPrivateResolvers(
      async (
        _req,
        args: GetProductDetailQueryArgs,
        { req }
      ): Promise<GetProductDetailResponse> => {
        const { id } = args;

        try {
          const product = await Product.findOne(
            { id },
            {
              relations: [
                "seller",
                "category",
                "subcategory",
                "review",
                "enquiry",
              ],
            }
          );

          if (product) {
            return {
              ok: true,
              error: null,
              product,
            };
          } else {
            return {
              ok: false,
              error: "product-not-found",
              product: null,
            };
          }
        } catch (e) {
          winston.info(e.message)
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
