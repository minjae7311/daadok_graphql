import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetInterestListQueryArgs,
  GetInterestListResponse,
} from "../../../types/graph";
import Interest from "../../../entities/Interest";
const winston = require("../../../config/winston");

// 관리자 권한 - 관심사 리스트 page 별로 가져오기
const resolvers: Resolvers = {
  Query: {
    GetInterestList: adminPrivateResolvers(
      async (
        _res,
        args: GetInterestListQueryArgs,
        { req }
      ): Promise<GetInterestListResponse> => {
        const { page } = args;

        try {
          const interest = await Interest.find({
            order: { id: "ASC" },
            skip: page,
            take: 10,
            withDeleted: true,
          });

          return {
            ok: true,
            error: null,
            interest,
          };
        } catch (e) {
          winston.info(e.message);
          return {
            ok: false,
            error: e.message,
            interest: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
