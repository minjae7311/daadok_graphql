import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  CancelMyDibsMutationArgs,
  CancelMyDibsResponse,
} from "../../../types/graph";
import Dibs from "../../../entities/Dibs";
const winston = require("../../../config/winston");

// 유저가 찜한 상품에 등롹된 상품들을 취소
const resolvers: Resolvers = {
  Mutation: {
    CancelMyDibs: privateResolver(
      async (
        _res,
        args: CancelMyDibsMutationArgs,
        { req }
      ): Promise<CancelMyDibsResponse> => {
        const { user } = req;
        const { productId } = args;

        try {
          const dibs = await Dibs.findOne({
            where: { product: productId, user: user.id },
            relations: ["user", "product"],
          });

          if (!dibs) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          await dibs.softRemove();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Cancel-MyDibs : "+e.message);
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
