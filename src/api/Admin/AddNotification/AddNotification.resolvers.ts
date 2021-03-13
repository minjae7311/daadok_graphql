import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import Notification from "../../../entities/Notification";
import {
  AddNotificationMutationArgs,
  AddNotificationResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
const winston = require("../../../config/winston");

// 관리자 권한 - 공지 등록하기
const resolvers: Resolvers = {
  Mutation: {
    AddNotification: adminPrivateResolvers(
      async (
        _res,
        args: AddNotificationMutationArgs,
        { req }
      ): Promise<AddNotificationResponse> => {
        const notNullArgs = cleanNullArgs(args);

        try {
          const newNotification = await Notification.create({
            ...notNullArgs,
          }).save();

          if (!newNotification) {
            return {
              ok: false,
              error: "failed-to-create-Notification",
            };
          }

          newNotification.save();

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
