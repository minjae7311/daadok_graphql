import { Resolvers } from "../../../types/resolvers";
import { GetKeywordListResponse } from "../../../types/graph";
import Keyword from "../../../entities/Keyword";
const winston = require("../../../config/winston");

// 키워드 가져오기
const resolvers: Resolvers = {
  Query: {
    GetKeyword: async (
      _res,
      args: GetKeywordListResponse,
      { req }
    ): Promise<GetKeywordListResponse> => {
      try {
        const keyword = await Keyword.find({
          relations: ["product"],
          order: { value: "ASC" },
        });

        return {
          ok: true,
          error: null,
          keyword,
        };
      } catch (e) {
        winston.info("Get-Keyword : "+e.message);
        return {
          ok: false,
          error: e.message,
          keyword: null,
        };
      }
    },
  },
};

export default resolvers;
