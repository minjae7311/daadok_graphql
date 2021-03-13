import { Resolvers } from "../../../types/resolvers";
import {
  CheckUserIdMutationArgs,
  CheckUserIdResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
const winston = require("../../../config/winston");

// 유저 권한 - 검색헀던 단어 제거
const resolvers: Resolvers = {
  Mutation: {
    CheckUserId: async (
      _res,
      args: CheckUserIdMutationArgs,
      { req }
    ): Promise<CheckUserIdResponse> => {
      const { loginId } = args;

      try {
        const check = await User.findOne({ loginId });

        if (check) {
          return {
            ok: false,
            error: "already-loginId",
          };
        }

        return {
          ok: true,
          error: null,
        };
      } catch (e) {
        winston.info("Check-UserId : "+e.message);

        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
