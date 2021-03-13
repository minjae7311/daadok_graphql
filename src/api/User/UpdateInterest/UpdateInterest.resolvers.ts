import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateInterestMutationArgs,
  UpdateInterestResponse,
} from "../../../types/graph";
import Interest from "../../../entities/Interest";
import { In } from "typeorm";
const winston = require("../../../config/winston");

// 유저 권한 - 관심사 변경하기
const resolvers: Resolvers = {
  Mutation: {
    UpdateInterest: privateResolver(
      async (
        _res,
        args: UpdateInterestMutationArgs,
        { req }
      ): Promise<UpdateInterestResponse> => {
        // Here, we do not get interests of user.
        const { user } = req;

        try {
          const { interestIds } = args;

          const interest = await Interest.find({
            where: { id: In(interestIds) },
          });

          // Rewrite interests.
          user.interest = interest;
          await user.save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info("Update-Interest : "+e.message);
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
