import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyCartResponse } from "../../../types/graph";
import Cart from "../../../entities/Cart";
const winston = require("../../../config/winston");

// 유저가 카트에 등록한 상품들을 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMyCart: privateResolver(
      async (_res, _args, { req }): Promise<GetMyCartResponse> => {
        const { user } = req;

        try {
          const cart = await Cart.find({
            where: { user: user.id },
            relations: ["product", "user"],
          });

          return {
            ok: true,
            error: null,
            cart,
          };
        } catch (e) {
          winston.info("Get-MyCart : "+e.message);
          return {
            ok: false,
            error: e.message,
            cart: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
