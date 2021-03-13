import SearchWord from "../../../entities/SearchWord";
import { Resolvers } from "../../../types/resolvers";
import {
  UpdateSearchWordMutationArgs,
  UpdateSearchWordResponse,
} from "../../../types/graph";
const winston = require("../../../config/winston");

// 유저 권한 - 검색했던 정보 저장
const resolvers: Resolvers = {
  Mutation: {
    UpdateSearchWord: async (
      _,
      args: UpdateSearchWordMutationArgs,
      { req }
    ): Promise<UpdateSearchWordResponse> => {
      const { user } = req;
      const { search } = args;

      try {
        if (!user) {
          return {
            ok: false,
            error: "no-login-user",
          };
        }

        const searchedWord = await SearchWord.create({
          search,
          user,
        }).save();

        if (searchedWord) {
          return {
            ok: true,
            error: null,
          };
        } else {
          return {
            ok: false,
            error: "failed-to-update-searchedWord",
          };
        }
      } catch (e) {
        winston.info("Update-SearchWord : "+e.message);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
