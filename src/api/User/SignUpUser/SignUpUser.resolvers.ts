import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import {
  SignUpUserMutationArgs,
  SignUpUserResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 일반 회원가입
const resolvers: Resolvers = {
  Mutation: {
    SignUpUser: async (
      _res,
      args: SignUpUserMutationArgs,
      { req }
    ): Promise<SignUpUserResponse> => {
      const notNullArgs = cleanNullArgs(args);
      const { loginId } = args;

      try {
        const exitingUser = await User.findOne({ loginId });

        if (exitingUser) {
          return {
            ok: false,
            error: "loginId is already",
          };
        } else {
          const newUser = await User.create({ ...notNullArgs }).save();
          if (!newUser) {
            return {
              ok: false,
              error: "failed-to-create-User",
            };
          }

          return {
            ok: true,
            error: null,
          };
        }
      } catch (e) {
        winston.info("SignUp-User : "+e.message);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
