import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  UpdateUserDataMutationArgs,
  UpdateUserDataResponse,
} from "../../../types/graph";
import User from "../../../entities/User";
const winston = require("../../../config/winston");

// 관리자 권한 - 유저 정보 변경, JSON 형식
const resolvers: Resolvers = {
  Mutation: {
    UpdateUserData: adminPrivateResolvers(
      async (
        _res,
        args: UpdateUserDataMutationArgs,
        { req }
      ): Promise<UpdateUserDataResponse> => {
        const { admin } = req;

        console.log(admin.id, "Updating User");

        try {
          const { data } = args;

          const user = await User.findOne({ id: data.id });

          if (user) {
            Object.keys(user).forEach((key) => {
              if (key !== "updatedAt" && key !== "createdAt")
                user[key] = data[key];
            });

            await user.save();

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "user-not-found",
            };
          }
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
