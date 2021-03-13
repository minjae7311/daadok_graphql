import { Resolvers } from "../../../types/resolvers";
import {
  UpdateUserProfileMutationArgs,
  UpdateUserProfileResponse,
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 유저 권한 - 개인 정보 수정하기
const resolvers: Resolvers = {
  Mutation: {
    UpdateUserProfile: privateResolver(
      async (
        _,
        args: UpdateUserProfileMutationArgs,
        { req }
      ): Promise<UpdateUserProfileResponse> => {
        const { user } = req;
        try {
          const inputArgs = Object.keys(cleanNullArgs(args));

          inputArgs.forEach(async (key) => {
            if (key !== "loginPw") {
              user[key] = args[key];
            } else {
              const password = user.hashPassword(args.loginPw);
              user.loginPw = await password;
            }
          });

          await user.save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Update-UserProfile : " + e.message);
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
