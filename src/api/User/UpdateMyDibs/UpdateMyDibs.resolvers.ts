import Product from "../../../entities/Product";
import Dibs from "../../../entities/Dibs";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateMyDibsMutationArgs,
  UpdateMyDibsResponse,
} from "../../../types/graph";
const winston = require("../../../config/winston");

// 유저가 원하는 해당 상품을 찜한 목록에 추가
const resolvers: Resolvers = {
  Mutation: {
    UpdateMyDibs: privateResolver(
      async (
        _,
        args: UpdateMyDibsMutationArgs,
        { req }
      ): Promise<UpdateMyDibsResponse> => {
        const { user } = req;
        const { productId } = args;

        try {
          const product = await Product.findOne({ id: productId });

          if (!product) {
            return {
              ok: false,
              error: "invalid-product",
            };
          }

          const dibs = await Dibs.create({
            product,
            user,
          }).save();

          if (dibs) {
            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "failed-to-update-dibs",
            };
          }
        } catch (e) {
          winston.info("Update-MyDibs : "+e.message);
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
