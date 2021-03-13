import { Resolvers } from "../../../types/resolvers";
import {
  UpdateSearchRankResponse,
  UpdateSearchRankMutationArgs,
} from "../../../types/graph";
import SearchRank from "../../../entities/SearchRank";
const winston = require("../../../config/winston");

// 검색어 순위
const resolvers: Resolvers = {
  Mutation: {
    UpdateSearchRank: async (
      _res,
      args: UpdateSearchRankMutationArgs,
      { req }
    ): Promise<UpdateSearchRankResponse> => {
      const { search } = args;

      try {
        const rank = await SearchRank.findOne({ search });

        if (rank) {
          rank.count = rank.count + 1;
          await rank.save();

          return {
            ok: true,
            error: null,
          };
        } else {
          await SearchRank.create({
            search,
          }).save();

          return {
            ok: true,
            error: null,
          };
        }
      } catch (e) {
        winston.info("Update-SearchRank : "+e.message);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
