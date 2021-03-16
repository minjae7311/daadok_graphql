import { Resolvers } from "../../../types/resolvers";
import { GetSearchRankResponse } from "../../../types/graph";
import SearchRank from "../../../entities/SearchRank";
const winston = require("../../../config/winston");

// 키워드 가져오기
const resolvers: Resolvers = {
  Query: {
    GetSearchRank: async (_res, { req }): Promise<GetSearchRankResponse> => {
      try {
        const searchRank = await SearchRank.find({
          order: { count: "DESC" },
          take: 10,
        });

        return {
          ok: true,
          error: null,
          searchRank,
        };
      } catch (e) {
        winston.info("Get-SearchRank : "+e.message);
        return {
          ok: false,
          error: e.message,
          searchRank: null,
        };
      }
    },
  },
};

export default resolvers;
