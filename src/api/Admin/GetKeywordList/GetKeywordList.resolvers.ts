import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetKeywordListQueryArgs,
  GetKeywordListResponse,
} from "../../../types/graph";
import Keyword from "../../../entities/Keyword";
const winston = require("../../../config/winston");

// 관리자 권한 - 키워드 리스트 page 별로 가져오기
const resolvers: Resolvers = {
  Query: {
    GetKeywordList: adminPrivateResolvers(
      async (
        _res,
        args: GetKeywordListQueryArgs,
        { req }
      ): Promise<GetKeywordListResponse> => {
        const { page } = args;

        try {
          const keyword = await Keyword.find({
            relations: ["product"],
            order: { id: "ASC" },
            skip: page,
            take: 10,
            withDeleted: true,
          });

          return {
            ok: true,
            error: null,
            keyword,
          };
        } catch (e) {
          winston.info(e.message);
          return {
            ok: false,
            error: e.message,
            keyword: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
