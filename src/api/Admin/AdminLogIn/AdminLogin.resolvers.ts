import { Resolvers } from "../../../types/resolvers";
import Admin from "../../../entities/Admin";
import {
  AdminLoginResponse,
  AdminLoginMutationArgs,
} from "../../../types/graph";
import createJWT from "../../../utils/create.JWT";
const winston = require("../../../config/winston");

// 관리자 로그인
const resolvers: Resolvers = {
  Mutation: {
    AdminLogin: async (
      _res,
      args: AdminLoginMutationArgs,
      req
    ): Promise<AdminLoginResponse> => {
      const { loginId, loginPw } = args;

      console.log(loginId, loginPw, "\n\n");

      try {
        const admin = await Admin.findOne({ loginId });

        if (!admin) {
          return {
            ok: false,
            error: "no-admin-found",
            token: null,
          };
        }

        const validPassword = await admin.comparePassword(loginPw);
        const token = createJWT(admin.id, "admin");

        if (validPassword) {
          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          return {
            ok: false,
            error: "wrong-password",
            token: null,
          };
        }
      } catch (e) {
        winston.info(e.message);
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
