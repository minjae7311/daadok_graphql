import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  DeleteMySearchWordMutationArgs,
  DeleteMySearchWordResponse,
} from "../../../types/graph";
import SearchWord from "../../../entities/SearchWord";
const winston = require("../../../config/winston");

// 유저 권한 - 검색헀던 단어 제거
const resolvers: Resolvers = {
  Mutation: {
    DeleteMySearchWord: privateResolver(
      async (
        _res,
        args: DeleteMySearchWordMutationArgs,
        { req }
      ): Promise<DeleteMySearchWordResponse> => {
        const { user } = req;
        const { searchWordId } = args;

        try {
          for (let i = 0; i < searchWordId.length; i++) {
            const searchWord = await SearchWord.findOne(
              { id: searchWordId[i] },
              { relations: ["user"] }
            );

            if (!searchWord) {
              return {
                ok: false,
                error: "searchWord-not-found",
              };
            }

            if (searchWord.user.id != user.id) {
              return {
                ok: false,
                error: "un-auth-del-word",
              };
            }

            await searchWord.softRemove();
          }
          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Delete-MySearchWord : "+e.message);

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
