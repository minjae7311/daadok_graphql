import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import {
  SignUpUserInKakaoMutationArgs,
  SignUpUserInKakaoResponse,
} from "../../../types/graph";
// import privateResolver from "../../../utils/privateResolver";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// sns 회원가입
const resolvers: Resolvers = {
  Mutation: {
    SignUpUserInKakao: async (
      _res,
      args: SignUpUserInKakaoMutationArgs,
      { req }
    ): Promise<SignUpUserInKakaoResponse> => {
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
        winston.info("SignUp-Kakao : "+e.message);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
