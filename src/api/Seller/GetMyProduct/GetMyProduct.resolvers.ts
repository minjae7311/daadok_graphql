import { Resolvers } from "../../../types/resolvers";
import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
import { GetMyProductResponse } from "../../../types/graph";
import Seller from "../../../entities/Seller";
const winston = require("../../../config/winston");

// 판매자 권한 - 등록한 상품 목록 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMyProduct: sellerPrivateResolvers(
      async (_res, _args, { req }): Promise<GetMyProductResponse> => {
        const { seller } = req;

        try {
          const currentSeller = await Seller.findOne(
            { id: seller.id },
            { relations: ["product"] }
          );

          if (!currentSeller)
            return {
              ok: false,
              error: "seller-not-found",
              product: null,
            };

          return {
            ok: true,
            error: null,
            product: currentSeller?.product,
          };
        } catch (e) {
          winston.info("Get-MyProduct : "+e.message);
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
