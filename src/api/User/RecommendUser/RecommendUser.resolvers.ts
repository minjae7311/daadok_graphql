import { Resolvers } from "../../../types/resolvers";
import {
  RecommendUserResponse,
  RecommendUserMutationArgs,
} from "../../../types/graph";
import User from "../../../entities/User";
const winston = require("../../../config/winston");

// 검색어 순위
const resolvers: Resolvers = {
  Mutation: {
    RecommendUser: async (
      _res,
      args: RecommendUserMutationArgs,
      { req }
    ): Promise<RecommendUserResponse> => {
      const { userName } = args;

      try {
        const user = await User.findOne({ loginId: userName });

        if (user) {
          user.friend_recommend = user.friend_recommend + 1;
          await user.save();

          return {
            ok: true,
            error: null,
          };
        } else {
          return {
            ok: false,
            error: "user-not-found",
          };
        }
      } catch (e) {
        winston.info("Recomment-User: " + e.message);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
