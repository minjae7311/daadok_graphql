import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import Keyword from "../../../entities/Keyword";
import {
  AddKeywordMutationArgs,
  AddKeywordResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";

// 관리자 권한 - 키워드 등록하기
const resolvers: Resolvers = {
  Mutation: {
    AddKeyword: adminPrivateResolvers(
      async (
        _res,
        args: AddKeywordMutationArgs,
        { req }
      ): Promise<AddKeywordResponse> => {
        const notNullArgs = cleanNullArgs(args);

        try {
          const newKeyword = await Keyword.create({ ...notNullArgs }).save();

          if (!newKeyword) {
            return {
              ok: false,
              error: "failed-to-create-keyword",
            };
          }

          newKeyword.save();

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
