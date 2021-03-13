import { Resolvers } from "../../../types/resolvers";
import Notification from "../../../entities/Notification";
import { GetNotificationResponse } from "../../../types/graph";
const winston = require("../../../config/winston");

// 등록된 공지사항 목록 가져오기
const resolvers: Resolvers = {
  Query: {
    GetNotification: async (
      _res,
      _args,
      _
    ): Promise<GetNotificationResponse> => {
      try {
        const notification = await Notification.find();

        return {
          ok: true,
          error: null,
          notification,
        };
      } catch (e) {
        winston.info("Get-Notification : "+e.message);

        return {
          ok: false,
          error: e.message,
          notification: null,
        };
      }
    },
  },
};

export default resolvers;
