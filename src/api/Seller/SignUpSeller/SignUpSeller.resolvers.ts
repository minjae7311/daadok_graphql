import Seller from "../../../entities/Seller";
import { Resolvers } from "../../../types/resolvers";
import {
  SignUpSellerMutationArgs,
  SignUpSellerResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 판매자 회원가입
const resolvers: Resolvers = {
  Mutation: {
    SignUpSeller: async (
      _res,
      args: SignUpSellerMutationArgs,
      { req }
    ): Promise<SignUpSellerResponse> => {
      const notNullArgs = cleanNullArgs(args);
      const { loginId } = args;

      try {
        const exitingSeller = await Seller.findOne({ loginId });

        if (exitingSeller) {
          return {
            ok: false,
            error: "loginId is already",
          };
        } else {
          const newSeller = await Seller.create({ ...notNullArgs }).save();
          if (!newSeller) {
            return {
              ok: false,
              error: "failed-to-create-seller",
            };
          }

          return {
            ok: true,
            error: null,
          };
        }
      } catch (e) {
        winston.info("SignUp-Seller : "+e.message);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
