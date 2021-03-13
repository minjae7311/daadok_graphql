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
        const newDiscount = [...discount];

        // 할인율이 큰 순서대로 정렬
        const discountRate = newDiscount.sort((a, b) => {
          if (
            (a.product.price - a.reduced_price) / a.product.price <
            (b.product.price - b.reduced_price) / b.product.price
          ) {
            return -1;
          } else if (
            (a.product.price - a.reduced_price) / a.product.price >
            (b.product.price - b.reduced_price) / b.product.price
          ) {
            return 1;
          } else {
            return 0;
          }
        });

        const takeDiscount = discountRate.slice(0, 6);

        return {
          ok: true,
          error: null,
          discount: takeDiscount,
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
