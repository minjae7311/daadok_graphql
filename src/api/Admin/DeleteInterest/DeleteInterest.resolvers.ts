import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  DeleteInterestMutationArgs,
  DeleteInterestResponse,
} from "../../../types/graph";
import Interest from "../../../entities/Interest";
const winston = require("../../../config/winston");

// 관리자 권한 - 관심사 목록 지우기
const resolvers: Resolvers = {
  Mutation: {
    DeleteInterest: adminPrivateResolvers(
      async (
        _res,
        args: DeleteInterestMutationArgs,
        { req }
      ): Promise<DeleteInterestResponse> => {
        const { interestId } = args;

        try {
          const interest = await Interest.findOne({
            id: interestId!,
          });
          if (!interest) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          await interest.softRemove();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          winston.info(e.message);
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
