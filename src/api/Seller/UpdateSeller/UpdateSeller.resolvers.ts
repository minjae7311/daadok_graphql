import { Resolvers } from "../../../types/resolvers";
import {
  UpdateSellerMutationArgs,
  UpdateSellerResponse,
} from "../../../types/graph";
// import sellerPrivateResolvers from "../../../utils/sellerPrivateResolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
import Seller from "../../../entities/Seller";
const winston = require("../../../config/winston");

// 판매자 권한 - 등록 상품 세부사항 수정
const resolvers: Resolvers = {
  Mutation: {
    UpdateSeller: (
      async (
        _,
        args: UpdateSellerMutationArgs,
        { req }
      ): Promise<UpdateSellerResponse> => {

        try {
          const seller = await Seller.findOne(
            { id: args.sellerId },
          );
          const inputArgs = Object.keys(cleanNullArgs(args));

          if (!seller) {
            return {
              ok: false,
              error: "product-not-found",
            };
          }

          if (seller) {
            inputArgs.forEach((key) => {
                seller[key] = args[key];
            });

            await seller.save();

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "seller-not-matched",
            };
          }
        } catch (e) {
          winston.info("Update-Product : "+e.message);
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
