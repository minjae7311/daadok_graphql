import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import { UserLoginResponse, UserLoginMutationArgs } from "../../../types/graph";
import createJWT from "../../../utils/create.JWT";
const winston = require("../../../config/winston");

// 유저 로그인
const resolvers: Resolvers = {
  Mutation: {
    UserLogin: async (
      _res,
      args: UserLoginMutationArgs,
      req
    ): Promise<UserLoginResponse> => {
      const { loginId, loginPw } = args;

      try {
        const user = await User.findOne({
          where: { loginId, sns_login: false },
        });

        if (!user) {
          return {
            ok: false,
            error: "no-User-found",
            token: null,
          };
        }

        const validPassword = await user.comparePassword(loginPw);

        if (!validPassword) {
          return {
            ok: false,
            error: "wrong-password",
            token: null,
          };
        }

        const token = createJWT(user.id, "user");
        console.log(loginId, loginPw, token, "\n\n");

        return {
          ok: true,
          error: null,
          token,
        };
      } catch (e) {
        winston.info("User-Login : "+e.message);
        return {
          ok: true,
          error: e.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
