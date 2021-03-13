import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  DeleteUserMutationArgs,
  DeleteUserResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
const winston = require("../../../config/winston");

// 관리자 권한 - 유저 목록 지우기
const resolvers: Resolvers = {
  Mutation: {
    DeleteUser: adminPrivateResolvers(
      async (
        _res,
        args: DeleteUserMutationArgs,
        { req }
      ): Promise<DeleteUserResponse> => {
        const { userId } = args;

        try {
          const user = await User.findOne({ id: userId });

          if (!user) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          await user.softRemove();

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
