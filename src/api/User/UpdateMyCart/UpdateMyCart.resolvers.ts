import Product from "../../../entities/Product";
import Cart from "../../../entities/Cart";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateMyCartMutationArgs,
  UpdateMyCartResponse,
} from "../../../types/graph";
const winston = require("../../../config/winston");

// 유저가 원하는 해당 상품을 카트에 추가
const resolvers: Resolvers = {
  Mutation: {
    UpdateMyCart: privateResolver(
      async (
        _,
        args: UpdateMyCartMutationArgs,
        { req }
      ): Promise<UpdateMyCartResponse> => {
        const { user } = req;
        const { productId, shipment_term, wanted_date, amount } = args;

        try {
          const product = await Product.findOne({ id: productId });

          if (!product) {
            return {
              ok: false,
              error: "invalid-product",
            };
          }

          await Cart.create({
            product,
            user,
            shipment_term,
            wanted_date,
            amount,
          }).save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Update-MyCart : "+e.message);
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
