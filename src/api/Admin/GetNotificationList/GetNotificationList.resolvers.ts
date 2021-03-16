import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetNotificationListQueryArgs,
  GetNotificationListResponse,
} from "../../../types/graph";
import Notification from "../../../entities/Notification";
const winston = require("../../../config/winston");

// 관리자 권한 - 공지사항 리스트 page 별로 가져오기
const resolvers: Resolvers = {
  Query: {
    GetNotificationList: adminPrivateResolvers(
      async (
        _res,
        args: GetNotificationListQueryArgs,
        { req }
      ): Promise<GetNotificationListResponse> => {
        const { page } = args;

        try {
          const notification = await Notification.find({
            order: { id: "ASC" },
            skip: page,
            take: 10,
            withDeleted: true,
          });

          return {
            ok: true,
            error: null,
            notification,
          };
        } catch (e) {
          winston.info(e.message);
          return {
            ok: false,
            error: e.message,
            notification: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
