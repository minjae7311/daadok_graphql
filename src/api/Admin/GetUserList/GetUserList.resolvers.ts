import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetUserListQueryArgs,
  GetUserListResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
const winston = require("../../../config/winston");

// 관리자 권한 - 유저 리스트 page 별로 가져오기
const resolvers: Resolvers = {
  Query: {
    GetUserList: adminPrivateResolvers(
      async (
        _res,
        args: GetUserListQueryArgs,
        { req }
      ): Promise<GetUserListResponse> => {
        const { page } = args;

        try {
          const user = await User.find({
            order: { id: "ASC" },
            skip: page,
            take: 10,
            withDeleted: true,
          });

          return {
            ok: true,
            error: null,
            user,
          };
        } catch (e) {
          winston.info(e.message);
          return {
            ok: false,
            error: e.message,
            user: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
