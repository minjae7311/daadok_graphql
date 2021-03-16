import { Resolvers } from "../../../types/resolvers";
import { GetHotBrandResponse } from "../../../types/graph";
import Discount from "../../../entities/Discount";
const winston = require("../../../config/winston");

// 메인 페이지 핫딜 상품들 가져오기
const resolvers: Resolvers = {
  Query: {
    GetHotBrand: async (
      _res,
      _arg,
      { req }
    ): Promise<GetHotBrandResponse> => {
      try {
        const discount = await Discount.find({
          where: { status: true },
          relations: ["product","product.seller"],
        });

        return {
          ok: true,
          error: null,
          discount,
        };
      } catch (e) {
        winston.info("Get-HotBrand : "+e.message);
        return {
          ok: false,
          error: e.message,
          discount: null,
        };
      }
    },
  },
};

export default resolvers;
