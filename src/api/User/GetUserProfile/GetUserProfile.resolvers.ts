import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetUserProfileResponse } from "../../../types/graph";
const winston = require("../../../config/winston");

// 유저 권한 - 입력한 개인 정보 가져오기
const resolvers: Resolvers = {
  Query: {
    GetUserProfile: privateResolver(
      async (_res, _args, { req }): Promise<GetUserProfileResponse> => {
        const { user } = req;

        if (user) {
          return {
            ok: true,
            error: null,
            user,
          };
        } else {
          winston.info("not-logged-in-user");
          return {
            ok: true,
            error: "user-not-found",
            user: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
