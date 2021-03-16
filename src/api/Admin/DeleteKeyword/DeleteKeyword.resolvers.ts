import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  DeleteKeywordMutationArgs,
  DeleteKeywordResponse,
} from "../../../types/graph";
import Keyword from "../../../entities/Keyword";
const winston = require("../../../config/winston");

// 관리자 권한 - 키워드 목록 지우기
const resolvers: Resolvers = {
  Mutation: {
    DeleteKeyword: adminPrivateResolvers(
      async (
        _res,
        args: DeleteKeywordMutationArgs,
        { req }
      ): Promise<DeleteKeywordResponse> => {
        const { keywordId } = args;

        try {
          const keyword = await Keyword.findOne({
            id: keywordId!,
          });
          if (!keyword) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          await keyword.softRemove();

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
