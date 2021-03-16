import { Resolvers } from "../../../types/resolvers";
import Seller from "../../../entities/Seller";
import {
  SellerLoginResponse,
  SellerLoginMutationArgs,
} from "../../../types/graph";
import createJWT from "../../../utils/create.JWT";
const winston = require("../../../config/winston");

// 판매자 로그인
const resolvers: Resolvers = {
  Mutation: {
    SellerLogin: async (
      _res,
      args: SellerLoginMutationArgs,
      req
    ): Promise<SellerLoginResponse> => {
      const { loginId, loginPw } = args;

      try {
        const seller = await Seller.findOne({ loginId });

        if (!seller) {
          return {
            ok: false,
            error: "no-seller-found",
            token: null,
          };
        }

        const validPassword = await seller.comparePassword(loginPw);

        if (!validPassword) {
          return {
            ok: false,
            error: "wrong-password",
            token: null,
          };
        }

        const token = createJWT(seller.id, "seller");
        console.log(loginId, loginPw, token, "\n\n");

        return {
          ok: true,
          error: "login-error",
          token,
        };
      } catch (e) {
        winston.info("Seller-Login : "+e.message);
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
