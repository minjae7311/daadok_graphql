import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetUserDetailQueryArgs,
  GetUserDetailResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
const winston = require("../../../config/winston");

// 관리자 권한 - 유저의 상세 정보 가져오기
const resolvers: Resolvers = {
  Query: {
    GetUserDetail: adminPrivateResolvers(
      async (
        _req,
        args: GetUserDetailQueryArgs,
        { req }
      ): Promise<GetUserDetailResponse> => {
        const { id } = args;

        try {
          const user = await User.findOne(
            { id },
            {
              relations: ["interests", "credit"],
            }
          );

          if (user) {
            return {
              ok: true,
              error: null,
              user,
            };
          } else {
            return {
              ok: false,
              error: "user-not-found",
              user: null,
            };
          }
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
