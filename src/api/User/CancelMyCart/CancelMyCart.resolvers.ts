import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  CancelMyCartMutationArgs,
  CancelMyCartResponse,
} from "../../../types/graph";
import Cart from "../../../entities/Cart";
import { In } from "typeorm";
const winston = require("../../../config/winston");

// 유저가 카트에 등롹된 상품들을 제거
const resolvers: Resolvers = {
  Mutation: {
    CancelMyCart: privateResolver(
      async (
        _res,
        args: CancelMyCartMutationArgs,
        { req }
      ): Promise<CancelMyCartResponse> => {
        const { user } = req;
        const { cartId } = args;

        try {
          const cart = await Cart.find({
            where: { id: In(cartId), user: user.id },
            relations: ["user", "product"],
          });

          if (!cart) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          cart.map(async (item) => {
            return await item.softRemove();
          });

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Cancel-MyCart : "+e.message);
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
