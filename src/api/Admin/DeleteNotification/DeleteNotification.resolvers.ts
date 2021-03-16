import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  DeleteNotificationMutationArgs,
  DeleteNotificationResponse,
} from "../../../types/graph";
import Notification from "../../../entities/Notification";
const winston = require("../../../config/winston");

// 관리자 권한 - 공지사항 지우기
const resolvers: Resolvers = {
  Mutation: {
    DeleteNotification: adminPrivateResolvers(
      async (
        _res,
        args: DeleteNotificationMutationArgs,
        { req }
      ): Promise<DeleteNotificationResponse> => {
        const { notificationId } = args;

        try {
          const notification = await Notification.findOne({
            id: notificationId!,
          });
          if (!notification) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          await notification.softRemove();

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
