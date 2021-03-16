import { Resolvers } from "../../../types/resolvers";
import { GetEventResponse } from "../../../types/graph";
import Event from "../../../entities/Event";
const winston = require("../../../config/winston");

// 유저가 등록한 카드 목록 가져오기
const resolvers: Resolvers = {
  Query: {
    GetEvent: (
      async (_res, _args, { req }): Promise<GetEventResponse> => {

        try {
          const event = await Event.find({
            where: { active: true },
            order: { updatedAt: "DESC" },
          });

          return {
            ok: true,
            error: null,
            event,
          };
        } catch (e) {
          winston.info("Get-Event : " + e.message);
          return {
            ok: false,
            error: e.message,
            event: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
