import { Resolvers } from "../../../types/resolvers";
import { GetSellerQueryArgs ,GetSellerResponse } from "../../../types/graph";
import Seller from "../../../entities/Seller";
const winston = require("../../../config/winston");

// 브랜드 페이지 상품 정보 가져오기
const resolvers: Resolvers = {
  Query: {
    GetSeller: (
      async (_res, args: GetSellerQueryArgs, { req }): Promise<GetSellerResponse> => {
        const {sellerId} = args

        try {
          const seller = await Seller.findOne(
            { id: sellerId },
            { relations: ["product"] }
          );

          if (!seller)
            return {
              ok: false,
              error: "seller-not-found",
              seller: null,
            };

          return {
            ok: true,
            error: null,
            seller,
          };
        } catch (e) {
          winston.info("Get-Seller : "+e.message);
          return {
            ok: false,
            error: e.message,
            seller: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
