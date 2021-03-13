import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  SetMainCreditMutationArgs,
  SetMainCreditResponse,
} from "../../../types/graph";
import Credit from "../../../entities/Credit";
const winston = require("../../../config/winston");

// 유저가 선택한 카드를 메인으로 등록
const resolvers: Resolvers = {
  Mutation: {
    SetMainCredit: privateResolver(
      async (
        _res,
        args: SetMainCreditMutationArgs,
        { req }
      ): Promise<SetMainCreditResponse> => {
        const { user } = req;
        const { creditId } = args;

        try {
          const credit = await Credit.findOne({
            id: creditId,
          });

          if (!credit) {
            return {
              ok: false,
              error: "credit-not-found",
            };
          }

          const creditList = await Credit.find({
            user
          });
          creditList.forEach((credit) => {
            if (credit.isMain == true) {
              credit.isMain = false;
              credit.save();
            }
          });

          credit.isMain = true;
          await credit.save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Set-MainCredit : "+e.message);
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
