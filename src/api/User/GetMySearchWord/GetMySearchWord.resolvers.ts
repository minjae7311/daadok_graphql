import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMySearchWordResponse } from "../../../types/graph";
import SearchWord from "../../../entities/SearchWord";
const winston = require("../../../config/winston");

// 유저 권한 - 검색한 단어들 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMySearchWord: privateResolver(
      async (_res, _args, { req }): Promise<GetMySearchWordResponse> => {
        const { user } = req;

        try {
          const searchWord = await SearchWord.find({
            where: { user: user },
            order: { updatedAt: "DESC" },
          });

          if (searchWord) {
            return {
              ok: true,
              error: null,
              searchWord,
            };
          } else {
            return {
              ok: false,
              error: "searchWord-not-found",
              searchWord: null,
            };
          }
        } catch (e) {
          winston.info("Get-MySearchWord : "+e.message);
          return {
            ok: false,
            error: e.message,
            searchWord: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
