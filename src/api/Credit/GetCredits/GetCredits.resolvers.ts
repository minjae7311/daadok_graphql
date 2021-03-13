import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetCreditsResponse } from "../../../types/graph";
import Credit from "../../../entities/Credit";
const winston = require("../../../config/winston");

// 유저가 등록한 카드 목록 가져오기
const resolvers: Resolvers = {
  Query: {
    GetCredits: privateResolver(
      async (_res, _args, { req }): Promise<GetCreditsResponse> => {
        const { user } = req;

        try {
          const credit = await Credit.find({
            where: { user },
            order: { createdAt: "DESC" },
          });

          return {
            ok: true,
            error: null,
            credit,
          };
        } catch (e) {
          winston.info("Get-Credits : " + e.message);
          return {
            ok: false,
            error: e.message,
            credit: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
