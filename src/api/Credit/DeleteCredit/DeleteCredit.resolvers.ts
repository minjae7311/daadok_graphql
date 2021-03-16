import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  DeleteCreditMutationArgs,
  DeleteCreditResponse,
} from "../../../types/graph";
import Credit from "../../../entities/Credit";
const winston = require("../../../config/winston");

// 유저가 선택한 카드 정보를 제거
const resolvers: Resolvers = {
  Mutation: {
    DeleteCredit: privateResolver(
      async (
        _res,
        args: DeleteCreditMutationArgs,
        { req }
      ): Promise<DeleteCreditResponse> => {
        const { user } = req;
        const { creditId } = args;

        try {
          const credit = await Credit.findOne(
            { id: creditId },
            { relations: ["user"] }
          );

          if (!credit) {
            return {
              ok: false,
              error: "credit-not-found",
            };
          }

          if (credit.user.id != user.id) {
            return {
              ok: false,
              error: "un-auth-to-this-credit",
            };
          }

          await credit.softRemove();
          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Delete-Credit : "+e.message);

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
