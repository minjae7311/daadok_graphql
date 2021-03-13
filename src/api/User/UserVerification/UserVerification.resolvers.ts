import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import {
  UserVerificationResponse,
  UserVerificationMutationArgs,
} from "../../../types/graph";
const winston = require("../../../config/winston");

// 유저 인증
const resolvers: Resolvers = {
  Mutation: {
    UserVerification: async (
      _res,
      args: UserVerificationMutationArgs,
      req
    ): Promise<UserVerificationResponse> => {
      const { loginId, loginPw } = args;

      try {
        const user = await User.findOne({ loginId });

        if (!user) {
          return {
            ok: false,
            error: "no-User-found",
          };
        }

        const validPassword = await user.comparePassword(loginPw);

        if (!validPassword) {
          return {
            ok: false,
            error: "wrong-password",
          };
        }

        return {
          ok: true,
          error: "login-error",
        };
      } catch (e) {
        winston.info("User-Verification : "+e.message);
        return {
          ok: true,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
