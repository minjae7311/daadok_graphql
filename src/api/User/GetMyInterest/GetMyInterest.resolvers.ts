import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyInterestResponse } from "../../../types/graph";
import User from "../../../entities/User";
const winston = require("../../../config/winston");

// 유저 권한 - 선택한 관심사 가져오기
const resolvers: Resolvers = {
  Query: {
    GetMyInterest: privateResolver(
      async (_res, _args, { req }): Promise<GetMyInterestResponse> => {
        const { user } = req;

        try {
          const currentUser = await User.findOne(
            { id: user.id },
            { relations: ["interest"] }
          );

          if (!currentUser)
            return {
              ok: false,
              error: "user-not-found",
              interest: null,
            };

          return {
            ok: true,
            error: null,
            interest: currentUser?.interest,
          };
        } catch (e) {
          winston.info("Get-MyInterest : "+e.message);
          return {
            ok: false,
            error: e.message,
            interest: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
