import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  EnrollCreditResponse,
  EnrollCreditMutationArgs,
} from "../../../types/graph";
import Credit from "../../../entities/Credit";
import { verifyCredit } from "../../../utils/functions.payment";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 유저 카드 등록 (카드번호, 만료일, 비밀번호 앞자리 2개)
const resolvers: Resolvers = {
  Mutation: {
    EnrollCredit: privateResolver(
      async (
        _res,
        args: EnrollCreditMutationArgs,
        { req }
      ): Promise<EnrollCreditResponse> => {
        const { user } = req;
        const { card_number, expiry } = args;

        try {
          const existingCredit = await Credit.findOne({
            card_number,
            expiry,
          });

          if (existingCredit) {
            return {
              ok: false,
              error: "card-existing",
            };
          }

          const notNullArgs = cleanNullArgs(args);
          const newCredit = await Credit.create({
            user,
            ...notNullArgs,
          }).save();

          const verifyCreditResult = await verifyCredit(newCredit, args.pwd_2digit);
          
          if (verifyCreditResult.ok && verifyCreditResult.credit) {
            return {
              ok: true,
              error: null,
            };
          } else {
            await newCredit.remove();

            return {
              ok: false,
              error: verifyCreditResult.error,
            };
          }
        } catch (e) {
          winston.info("Enroll-Credit : "+e.message);
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
