import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import Interest from "../../../entities/Interest";
import {
  AddInterestMutationArgs,
  AddInterestResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";

// 관리자 권한 - 관심사 등록하기
const resolvers: Resolvers = {
  Mutation: {
    AddInterest: adminPrivateResolvers(
      async (
        _res,
        args: AddInterestMutationArgs,
        { req }
      ): Promise<AddInterestResponse> => {
        const notNullArgs = cleanNullArgs(args);

        try {
          const newInterest = await Interest.create({ ...notNullArgs }).save();

          if (!newInterest) {
            return {
              ok: false,
              error: "failed-to-create-interest",
            };
          }

          newInterest.save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
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
